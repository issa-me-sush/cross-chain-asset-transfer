// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GameA {
    mapping(address => uint256) public points;

    event PointsEarned(address indexed player, uint256 points);
    event PointsTransferred(address indexed player, uint256 points, bytes targetAddress);

    function earnPoints(uint256 _points) external {
        points[msg.sender] += _points;
        emit PointsEarned(msg.sender, _points);
    }

    function transferPoints(uint256 _points, bytes calldata targetAddress) external {
        require(points[msg.sender] >= _points, "Insufficient points");
        points[msg.sender] -= _points;
        emit PointsTransferred(msg.sender, _points, targetAddress);
    }
}
