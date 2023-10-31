// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Voting {
    // Struct to represent a candidate
    struct Candidate {
        string name;
        uint256 voteCount;   
    }

    // An array to store all the candidates
    Candidate[] public candidates;

    // Address of the owner of the contract
    address owner;

    // Mapping to keep track of who has voted
    mapping (address => bool) public voters;

    // Timestamp for the start and end of the voting period
    uint256 public votingStart;
    uint256 public votingEnd;

    // Constructor to initialize the contract
    constructor(string[] memory _candidateNames, uint256 _durationMinutes) {
        // Initialize candidates with the provided names and vote counts set to 0
        for(uint256 i=0; i < _candidateNames.length; i++){
            candidates.push(
                Candidate({
                    name: _candidateNames[i],
                    voteCount: 0
                })
            );
        }

        // Set the contract owner to the sender (the person who deploys the contract)
        owner = msg.sender;

        // Set the start and end times of the voting period
        votingStart = block.timestamp;
        votingEnd = block.timestamp + (_durationMinutes * 1 minutes);
    }

    // Modifier to restrict access to the owner of the contract
    modifier onlyOwner {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    // Function to add a new candidate to the list (only callable by the owner)
    function addCandidate(string memory _name) public onlyOwner {
        candidates.push(Candidate({
            name: _name,
            voteCount: 0
        }));
    }

    // Function to allow a voter to cast a vote for a candidate
    function vote(uint256 _candidateIndex) public {
        // Check if the sender has already voted
        require(!voters[msg.sender], "You have already voted !!!");

        // Check if the provided candidate index is valid
        require(_candidateIndex < candidates.length, "Invalid candidate index");

        // Increment the vote count for the selected candidate
        candidates[_candidateIndex].voteCount++;

        // Mark the sender as having voted
        voters[msg.sender] = true;
    }

    // Function to get a list of all candidates and their vote counts
    function getAllVotesOfCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }

    // Function to check if the voting is currently open
    function getVotingStatus() public view returns (bool) {
        return (block.timestamp >= votingStart && block.timestamp < votingEnd);
    }

    // Function to get the remaining time for voting (in seconds)
    function getRemainingTime() public view returns (uint256) {
        // Check if voting has started
        require(block.timestamp >= votingStart, "Voting has not started yet !!!");

        // If voting has ended, return 0
        if (block.timestamp >= votingEnd) {
            return 0;
        }

        // Calculate and return the remaining time
        return votingEnd - block.timestamp;
    }
}
