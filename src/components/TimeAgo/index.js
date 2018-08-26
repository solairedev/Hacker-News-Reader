import timeago from 'epoch-timeago';
import React from "react";

const TimeAgo = ({ time }) => <span>{timeago(time * 1000)}</span>

export default TimeAgo

