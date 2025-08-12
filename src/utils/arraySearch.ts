export const ArraySearch = (
  args: { searchValue: string },
  data: any[],
  fields: any[]
): any[] => {
  const { searchValue } = args;

  try {
    const getNestedValue = (obj: any, field: string): any => {
      return field.split('.').reduce((value, key) => {
        return value ? value[key] : undefined;
      }, obj);
    };

    const query = (item: any) => {
      return fields.some((field) => {
        const value = getNestedValue(item, field);

        if (typeof value === 'string') {
          return value.toLowerCase().includes(searchValue.toLowerCase());
        } else if (typeof value === 'boolean') {
          return value.toString() === searchValue.toLowerCase();
        } else if (typeof value === 'object' && value !== null) {
          return Object.values(value).some(
            (nestedValue) =>
              typeof nestedValue === 'string' &&
              nestedValue.toLowerCase().includes(searchValue.toLowerCase())
          );
        } else if (value instanceof Date || !isNaN(Date.parse(value))) {
          return new Date(value)
            .toISOString()
            .includes(searchValue.toLowerCase());
        }

        return false;
      });
    };

    const result = data.filter(query).sort((a: any, b: any) => {
      return b.createdAt?.getTime - a.createdAt?.getTime;
    });
    return result;
  } catch (error) {
    console.error('Error searching value:', error);
    throw new Error('Failed to search value');
  }
};
