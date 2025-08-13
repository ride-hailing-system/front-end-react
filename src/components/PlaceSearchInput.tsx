import { Input } from 'antd';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';

export type LocationType = {
  latitude: number;
  longitude: number;
  description: string;
};

const PlaceSearchInput = ({
  placeHolderText,
  onSelect,
  prefix,
  suffix,
}: {
  placeHolderText: string;
  onSelect: (value: LocationType | undefined) => void;
  prefix?: any;
  suffix?: any;
}) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      bounds: {
        north: 9.08,
        south: 8.98,
        east: 38.79,
        west: 38.69,
      },
      radius: 15000,
      componentRestrictions: { country: 'ET' },
    },
  });

  const handleSelect =
    ({ description }: { description: string }) =>
    () => {
      setValue(description, false);
      clearSuggestions();

      getGeocode({ address: description }).then((results: any[]) => {
        const { lat, lng } = getLatLng(results[0]);
        onSelect({ latitude: lat, longitude: lng, description });
      });
    };

  return (
    <div>
      <Input
        value={value}
        onChange={(e) => {
          !e.target.value && onSelect(undefined);
          setValue(e.target.value);
        }}
        disabled={!ready}
        placeholder={placeHolderText}
        className="w-full"
        size="large"
        allowClear
        prefix={prefix}
        suffix={suffix}
      />
      {status === 'OK' &&
        data.map(({ place_id, description }) => (
          <p
            key={place_id}
            onClick={handleSelect({ description })}
            className="p-2 cursor-pointer hover:bg-gray-500"
          >
            {description}
          </p>
        ))}
    </div>
  );
};

export default PlaceSearchInput;
