/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getEvent = /* GraphQL */ `
  query GetEvent($id: ID!) {
    getEvent(id: $id) {
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
export const listEvents = /* GraphQL */ `
  query ListEvents(
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getOrganization = /* GraphQL */ `
  query GetOrganization($id: ID!) {
    getOrganization(id: $id) {
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
export const listOrganizations = /* GraphQL */ `
  query ListOrganizations(
    $filter: ModelOrganizationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrganizations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        owner {
          id
        }
        host {
          id
        }
      }
      nextToken
    }
  }
`;
export const getSpeaker = /* GraphQL */ `
  query GetSpeaker($id: ID!) {
    getSpeaker(id: $id) {
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
export const listSpeakers = /* GraphQL */ `
  query ListSpeakers(
    $filter: ModelSpeakerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSpeakers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getAttendence = /* GraphQL */ `
  query GetAttendence($id: ID!) {
    getAttendence(id: $id) {
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
export const listAttendences = /* GraphQL */ `
  query ListAttendences(
    $filter: ModelAttendenceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAttendences(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getOwner = /* GraphQL */ `
  query GetOwner($id: ID!) {
    getOwner(id: $id) {
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
export const listOwners = /* GraphQL */ `
  query ListOwners(
    $filter: ModelOwnerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOwners(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getHost = /* GraphQL */ `
  query GetHost($id: ID!) {
    getHost(id: $id) {
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
export const listHosts = /* GraphQL */ `
  query ListHosts(
    $filter: ModelHostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getSpeaking = /* GraphQL */ `
  query GetSpeaking($id: ID!) {
    getSpeaking(id: $id) {
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
export const listSpeakings = /* GraphQL */ `
  query ListSpeakings(
    $filter: ModelSpeakingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSpeakings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
