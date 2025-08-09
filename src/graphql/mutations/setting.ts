import { gql } from '@apollo/client';
import { SETTING_FIELDS } from '../queries/setting';

export const SAVE_SETTING = gql`
  mutation saveSetting(
    $_id: String
    $general: GeneralInput!
    $location: LocationInput!
    $ride: RideInput!
    $payment: PaymentInput!
    $user: UserInput!
    $notification: NotificationInput!
    $templates: TemplatesInput!
  ) {
    saveSetting(
      _id: $_id
      general: $general
      location: $location
      ride: $ride
      payment: $payment
      user: $user
      notification: $notification
      templates: $templates
    ) {
      ${SETTING_FIELDS}
    }
  }
`;
