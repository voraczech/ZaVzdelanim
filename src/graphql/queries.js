/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getEvent = /* GraphQL */ `
  query GetEvent($id: ID!) {
    getEvent(id: $id) {
      id
      title
      description
      date
      dateEnd
      place
      image
      tags
      video
      link
      host {
        items {
          id
          organizationID
          eventID
        }
        nextToken
      }
      attendence {
        items {
          id
          eventID
          userID
        }
        nextToken
      }
      speaking {
        items {
          id
          eventID
          speakerID
        }
        nextToken
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
        date
        dateEnd
        place
        image
        tags
        video
        link
        host {
          nextToken
        }
        attendence {
          nextToken
        }
        speaking {
          nextToken
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
      name
      attendence {
        items {
          id
          eventID
          userID
        }
        nextToken
      }
      speaker {
        id
        name
        avatar
        bio
        links
        speaking {
          nextToken
        }
        followers {
          nextToken
        }
      }
      creator {
        items {
          id
          name
          creatorID
          description
          logo
          links
        }
        nextToken
      }
      admin {
        items {
          id
          organizationID
          userID
        }
        nextToken
      }
      followOrganization {
        items {
          id
          organizationID
          userID
        }
        nextToken
      }
      followSpeaker {
        items {
          id
          userID
          speakerID
        }
        nextToken
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
        name
        attendence {
          nextToken
        }
        speaker {
          id
          name
          avatar
          bio
          links
        }
        creator {
          nextToken
        }
        admin {
          nextToken
        }
        followOrganization {
          nextToken
        }
        followSpeaker {
          nextToken
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
      creatorID
      creator {
        id
        cognitoId
        name
        attendence {
          nextToken
        }
        speaker {
          id
          name
          avatar
          bio
          links
        }
        creator {
          nextToken
        }
        admin {
          nextToken
        }
        followOrganization {
          nextToken
        }
        followSpeaker {
          nextToken
        }
      }
      description
      logo
      links
      host {
        items {
          id
          organizationID
          eventID
        }
        nextToken
      }
      admins {
        items {
          id
          organizationID
          userID
        }
        nextToken
      }
      followers {
        items {
          id
          organizationID
          userID
        }
        nextToken
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
        creatorID
        creator {
          id
          cognitoId
          name
        }
        description
        logo
        links
        host {
          nextToken
        }
        admins {
          nextToken
        }
        followers {
          nextToken
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
      avatar
      bio
      links
      speaking {
        items {
          id
          eventID
          speakerID
        }
        nextToken
      }
      followers {
        items {
          id
          userID
          speakerID
        }
        nextToken
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
        avatar
        bio
        links
        speaking {
          nextToken
        }
        followers {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const searchEvents = /* GraphQL */ `
  query SearchEvents(
    $filter: SearchableEventFilterInput
    $sort: SearchableEventSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchEvents(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        description
        date
        dateEnd
        place
        image
        tags
        video
        link
        host {
          nextToken
        }
        attendence {
          nextToken
        }
        speaking {
          nextToken
        }
      }
      nextToken
      total
    }
  }
`;
export const searchUsers = /* GraphQL */ `
  query SearchUsers(
    $filter: SearchableUserFilterInput
    $sort: SearchableUserSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchUsers(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        cognitoId
        name
        attendence {
          nextToken
        }
        speaker {
          id
          name
          avatar
          bio
          links
        }
        creator {
          nextToken
        }
        admin {
          nextToken
        }
        followOrganization {
          nextToken
        }
        followSpeaker {
          nextToken
        }
      }
      nextToken
      total
    }
  }
`;
export const searchOrganizations = /* GraphQL */ `
  query SearchOrganizations(
    $filter: SearchableOrganizationFilterInput
    $sort: SearchableOrganizationSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchOrganizations(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        creatorID
        creator {
          id
          cognitoId
          name
        }
        description
        logo
        links
        host {
          nextToken
        }
        admins {
          nextToken
        }
        followers {
          nextToken
        }
      }
      nextToken
      total
    }
  }
`;
export const searchSpeakers = /* GraphQL */ `
  query SearchSpeakers(
    $filter: SearchableSpeakerFilterInput
    $sort: SearchableSpeakerSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchSpeakers(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        avatar
        bio
        links
        speaking {
          nextToken
        }
        followers {
          nextToken
        }
      }
      nextToken
      total
    }
  }
`;
export const searchAttendences = /* GraphQL */ `
  query SearchAttendences(
    $filter: SearchableAttendenceFilterInput
    $sort: SearchableAttendenceSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchAttendences(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        eventID
        userID
        event {
          id
          title
          description
          date
          dateEnd
          place
          image
          tags
          video
          link
        }
        user {
          id
          cognitoId
          name
        }
      }
      nextToken
      total
    }
  }
`;
export const searchSpeakerFollowers = /* GraphQL */ `
  query SearchSpeakerFollowers(
    $filter: SearchableSpeakerFollowerFilterInput
    $sort: SearchableSpeakerFollowerSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchSpeakerFollowers(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userID
        speakerID
        user {
          id
          cognitoId
          name
        }
        speaker {
          id
          name
          avatar
          bio
          links
        }
      }
      nextToken
      total
    }
  }
`;
export const searchOrgFollowers = /* GraphQL */ `
  query SearchOrgFollowers(
    $filter: SearchableOrgFollowerFilterInput
    $sort: SearchableOrgFollowerSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchOrgFollowers(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        organizationID
        userID
        organization {
          id
          name
          creatorID
          description
          logo
          links
        }
        user {
          id
          cognitoId
          name
        }
      }
      nextToken
      total
    }
  }
`;
