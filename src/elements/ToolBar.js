import React, { useState } from 'react';

export default function ToolBar(props) {
	return (
		<div id={props.id}>
			<input id='ruleInput' type='file' onChange={props.handleChangeRuleFile}/>
			<input id='5upletInput' type='file' onChange={props.handleChange5upletFile}/>
			<input id='inputSizeDgm' type='text' onChange={props.handleChangeInputSize}/>
			<button id='updateDgmSize' onClick={props.handleChangeSize}>update</button>
			<button id='zoomOut' onClick={props.zoomOut}>-</button>
			<button id='zoomIn' onClick={props.zoomIn}>+</button>
		</div>
	);
} 