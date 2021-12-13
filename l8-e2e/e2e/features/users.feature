@users-service
Feature: Users Service
  In order manage users
  As a developer
  I want to make sure CRUD operations through REST API works fine

  Scenario Outline: create a user
    Given A user <request>
    When I send POST request to /users
    Then I get response code 201

    Examples:
      | request                                                                                               |
      | {"id":99,"name":"Dwayne Klocko","email":"Rene30@hotmail.com","phoneNumber":"1-876-420-9890"}          |
      | {"id":7,"name":"Ian Weimann DVM","email":"Euna_Bergstrom@hotmail.com","phoneNumber":"(297) 962-1879"} |

  Scenario Outline: get user
    Given A userId <id> exist
    When I send GET request to /users
    Then I receive <response>

    Examples:
      | id | response                                                                                                                                      |
      | 99 | {"id":99,"name":"Dwayne Klocko","email":"Rene30@hotmail.com","phoneNumber":"1-876-420-9890","secondaryPhoneNumber": "(914) 249-3519"}         |
      | 7  | {"id":7,"name":"Ian Weimann DVM","email":"Euna_Bergstrom@hotmail.com","phoneNumber":"(297) 962-1879", "secondaryPhoneNumber": "788.323.7782"} |
