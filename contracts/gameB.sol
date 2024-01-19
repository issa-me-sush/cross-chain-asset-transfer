// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GameB {
    mapping(address => uint256) public points;

    event PointsReceived(address indexed player, uint256 points);

    function receivePoints(address _player, uint256 _points) external {
        points[_player] += _points;
        emit PointsReceived(_player, _points);
    }
}
