/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createEvent = /* GraphQL */ `
  mutation CreateEvent(
    $input: CreateEventInput!
    $condition: ModelEventConditionInput
  ) {
    createEvent(input: $input, condition: $condition) {
      id
      title
      description
      host {
        id
        organization {
          id
          name
        }
        event {
          id
          title
          description
        }
      }
      attendence {
        id
        event {
          id
          title
          description
        }
        user {
          id
          cognitoId
        }
      }
      speaking {
        id
        speaker {
          id
          name
        }
        event {
          id
          title
          description
        }
      }
    }
  }
`;
export const updateEvent = /* GraphQL */ `
  mutation UpdateEvent(
    $input: UpdateEventInput!
    $condition: ModelEventConditionInput
  ) {
    updateEvent(input: $input, condition: $condition) {
      id
      title
      description
      host {
        id
        organization {
          id
          name
        }
        event {
          id
          title
          description
        }
      }
      attendence {
        id
        event {
          id
          title
          description
        }
        user {
          id
          cognitoId
        }
      }
      speaking {
        id
        speaker {
          id
          name
        }
        event {
          id
          title
          description
        }
      }
    }
  }
`;
export const deleteEvent = /* GraphQL */ `
  mutation DeleteEvent(
    $input: DeleteEventInput!
    $condition: ModelEventConditionInput
  ) {
    deleteEvent(input: $input, condition: $condition) {
      id
      title
      description
      host {
        id
        organization {
          id
          name
        }
        event {
          id
          title
          description
        }
      }
      attendence {
        id
        event {
          id
          title
          description
        }
        user {
          id
          cognitoId
        }
      }
      speaking {
        id
        speaker {
          id
          name
        }
        event {
          id
          title
          description
        }
      }
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      cognitoId
      attendence {
        id
        event {
          id
          title
          description
        }
        user {
          id
          cognitoId
        }
      }
      organizations {
        id
        organization {
          id
          name
        }
        user {
          id
          cognitoId
        }
      }
      speaker {
        id
        name
        speaking {
          id
        }
        user {
          id
          cognitoId
        }
      }
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      cognitoId
      attendence {
        id
        event {
          id
          title
          description
        }
        user {
          id
          cognitoId
        }
      }
      organizations {
        id
        organization {
          id
          name
        }
        user {
          id
          cognitoId
        }
      }
      speaker {
        id
        name
        speaking {
          id
        }
        user {
          id
          cognitoId
        }
      }
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      cognitoId
      attendence {
        id
        event {
          id
          title
          description
        }
        user {
          id
          cognitoId
        }
      }
      organizations {
        id
        organization {
          id
          name
        }
        user {
          id
          cognitoId
        }
      }
      speaker {
        id
        name
        speaking {
          id
        }
        user {
          id
          cognitoId
        }
      }
    }
  }
`;
export const createOrganization = /* GraphQL */ `
  mutation CreateOrganization(
    $input: CreateOrganizationInput!
    $condition: ModelOrganizationConditionInput
  ) {
    createOrganization(input: $input, condition: $condition) {
      id
      name
      owner {
        id
        organization {
          id
          name
        }
        user {
          id
          cognitoId
        }
      }
      host {
        id
        organization {
          id
          name
        }
        event {
          id
          title
          description
        }
      }
    }
  }
`;
export const updateOrganization = /* GraphQL */ `
  mutation UpdateOrganization(
    $input: UpdateOrganizationInput!
    $condition: ModelOrganizationConditionInput
  ) {
    updateOrganization(input: $input, condition: $condition) {
      id
      name
      owner {
        id
        organization {
          id
          name
        }
        user {
          id
          cognitoId
        }
      }
      host {
        id
        organization {
          id
          name
        }
        event {
          id
          title
          description
        }
      }
    }
  }
`;
export const deleteOrganization = /* GraphQL */ `
  mutation DeleteOrganization(
    $input: DeleteOrganizationInput!
    $condition: ModelOrganizationConditionInput
  ) {
    deleteOrganization(input: $input, condition: $condition) {
      id
      name
      owner {
        id
        organization {
          id
          name
        }
        user {
          id
          cognitoId
        }
      }
      host {
        id
        organization {
          id
          name
        }
        event {
          id
          title
          description
        }
      }
    }
  }
`;
export const createSpeaker = /* GraphQL */ `
  mutation CreateSpeaker(
    $input: CreateSpeakerInput!
    $condition: ModelSpeakerConditionInput
  ) {
    createSpeaker(input: $input, condition: $condition) {
      id
      name
      speaking {
        id
        speaker {
          id
          name
        }
        event {
          id
          title
          description
        }
      }
      user {
        id
        cognitoId
        attendence {
          id
        }
        organizations {
          id
        }
        speaker {
          id
          name
        }
      }
    }
  }
`;
export const updateSpeaker = /* GraphQL */ `
  mutation UpdateSpeaker(
    $input: UpdateSpeakerInput!
    $condition: ModelSpeakerConditionInput
  ) {
    updateSpeaker(input: $input, condition: $condition) {
      id
      name
      speaking {
        id
        speaker {
          id
          name
        }
        event {
          id
          title
          description
        }
      }
      user {
        id
        cognitoId
        attendence {
          id
        }
        organizations {
          id
        }
        speaker {
          id
          name
        }
      }
    }
  }
`;
export const deleteSpeaker = /* GraphQL */ `
  mutation DeleteSpeaker(
    $input: DeleteSpeakerInput!
    $condition: ModelSpeakerConditionInput
  ) {
    deleteSpeaker(input: $input, condition: $condition) {
      id
      name
      speaking {
        id
        speaker {
          id
          name
        }
        event {
          id
          title
          description
        }
      }
      user {
        id
        cognitoId
        attendence {
          id
        }
        organizations {
          id
        }
        speaker {
          id
          name
        }
      }
    }
  }
`;
export const createAttendence = /* GraphQL */ `
  mutation CreateAttendence(
    $input: CreateAttendenceInput!
    $condition: ModelAttendenceConditionInput
  ) {
    createAttendence(input: $input, condition: $condition) {
      id
      event {
        id
        title
        description
        host {
          id
        }
        attendence {
          id
        }
        speaking {
          id
        }
      }
      user {
        id
        cognitoId
        attendence {
          id
        }
        organizations {
          id
        }
        speaker {
          id
          name
        }
      }
    }
  }
`;
export const updateAttendence = /* GraphQL */ `
  mutation UpdateAttendence(
    $input: UpdateAttendenceInput!
    $condition: ModelAttendenceConditionInput
  ) {
    updateAttendence(input: $input, condition: $condition) {
      id
      event {
        id
        title
        description
        host {
          id
        }
        attendence {
          id
        }
        speaking {
          id
        }
      }
      user {
        id
        cognitoId
        attendence {
          id
        }
        organizations {
          id
        }
        speaker {
          id
          name
        }
      }
    }
  }
`;
export const deleteAttendence = /* GraphQL */ `
  mutation DeleteAttendence(
    $input: DeleteAttendenceInput!
    $condition: ModelAttendenceConditionInput
  ) {
    deleteAttendence(input: $input, condition: $condition) {
      id
      event {
        id
        title
        description
        host {
          id
        }
        attendence {
          id
        }
        speaking {
          id
        }
      }
      user {
        id
        cognitoId
        attendence {
          id
        }
        organizations {
          id
        }
        speaker {
          id
          name
        }
      }
    }
  }
`;
export const createOwner = /* GraphQL */ `
  mutation CreateOwner(
    $input: CreateOwnerInput!
    $condition: ModelOwnerConditionInput
  ) {
    createOwner(input: $input, condition: $condition) {
      id
      organization {
        id
        name
        owner {
          id
        }
        host {
          id
        }
      }
      user {
        id
        cognitoId
        attendence {
          id
        }
        organizations {
          id
        }
        speaker {
          id
          name
        }
      }
    }
  }
`;
export const updateOwner = /* GraphQL */ `
  mutation UpdateOwner(
    $input: UpdateOwnerInput!
    $condition: ModelOwnerConditionInput
  ) {
    updateOwner(input: $input, condition: $condition) {
      id
      organization {
        id
        name
        owner {
          id
        }
        host {
          id
        }
      }
      user {
        id
        cognitoId
        attendence {
          id
        }
        organizations {
          id
        }
        speaker {
          id
          name
        }
      }
    }
  }
`;
export const deleteOwner = /* GraphQL */ `
  mutation DeleteOwner(
    $input: DeleteOwnerInput!
    $condition: ModelOwnerConditionInput
  ) {
    deleteOwner(input: $input, condition: $condition) {
      id
      organization {
        id
        name
        owner {
          id
        }
        host {
          id
        }
      }
      user {
        id
        cognitoId
        attendence {
          id
        }
        organizations {
          id
        }
        speaker {
          id
          name
        }
      }
    }
  }
`;
export const createHost = /* GraphQL */ `
  mutation CreateHost(
    $input: CreateHostInput!
    $condition: ModelHostConditionInput
  ) {
    createHost(input: $input, condition: $condition) {
      id
      organization {
        id
        name
        owner {
          id
        }
        host {
          id
        }
      }
      event {
        id
        title
        description
        host {
          id
        }
        attendence {
          id
        }
        speaking {
          id
        }
      }
    }
  }
`;
export const updateHost = /* GraphQL */ `
  mutation UpdateHost(
    $input: UpdateHostInput!
    $condition: ModelHostConditionInput
  ) {
    updateHost(input: $input, condition: $condition) {
      id
      organization {
        id
        name
        owner {
          id
        }
        host {
          id
        }
      }
      event {
        id
        title
        description
        host {
          id
        }
        attendence {
          id
        }
        speaking {
          id
        }
      }
    }
  }
`;
export const deleteHost = /* GraphQL */ `
  mutation DeleteHost(
    $input: DeleteHostInput!
    $condition: ModelHostConditionInput
  ) {
    deleteHost(input: $input, condition: $condition) {
      id
      organization {
        id
        name
        owner {
          id
        }
        host {
          id
        }
      }
      event {
        id
        title
        description
        host {
          id
        }
        attendence {
          id
        }
        speaking {
          id
        }
      }
    }
  }
`;
export const createSpeaking = /* GraphQL */ `
  mutation CreateSpeaking(
    $input: CreateSpeakingInput!
    $condition: ModelSpeakingConditionInput
  ) {
    createSpeaking(input: $input, condition: $condition) {
      id
      speaker {
        id
        name
        speaking {
          id
        }
        user {
          id
          cognitoId
        }
      }
      event {
        id
        title
        description
        host {
          id
        }
        attendence {
          id
        }
        speaking {
          id
        }
      }
    }
  }
`;
export const updateSpeaking = /* GraphQL */ `
  mutation UpdateSpeaking(
    $input: UpdateSpeakingInput!
    $condition: ModelSpeakingConditionInput
  ) {
    updateSpeaking(input: $input, condition: $condition) {
      id
      speaker {
        id
        name
        speaking {
          id
        }
        user {
          id
          cognitoId
        }
      }
      event {
        id
        title
        description
        host {
          id
        }
        attendence {
          id
        }
        speaking {
          id
        }
      }
    }
  }
`;
export const deleteSpeaking = /* GraphQL */ `
  mutation DeleteSpeaking(
    $input: DeleteSpeakingInput!
    $condition: ModelSpeakingConditionInput
  ) {
    deleteSpeaking(input: $input, condition: $condition) {
      id
      speaker {
        id
        name
        speaking {
          id
        }
        user {
          id
          cognitoId
        }
      }
      event {
        id
        title
        description
        host {
          id
        }
        attendence {
          id
        }
        speaking {
          id
        }
      }
    }
  }
`;
