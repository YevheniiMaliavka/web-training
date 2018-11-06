Feature: Is it Feierabend?
    I want to know if I can go home

    Scenario: 16 oclock is not Feierabend
        Given right now is 16 oclock
        When I ask if I am allowed to go home
        Then I should be told "no"
    
    Scenario: 17 oclock is Feierabend
        Given right now is 17 oclock
        When I ask if I am allowed to go home
        Then I should be told "yes"
