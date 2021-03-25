const defaultCellSize = 12;
const zoomStep = 0.1;

const styleContainer = {
                        'height': "90vh",
                        'overflowX': "auto",
                        'overflowY': "auto"
                      };

const emptyFunction = () => {};

const getColor = (state) => {
	switch(state) {
		case '0': return 'white';
		case '1': return 'green';
		case '2': return 'orange';
		case '3': return 'cyan';
		case '4': return 'lightgreen';
		case '5': return 'blue';
		case '6': return 'gray';
		default : return 'black';
	}	
}

export { defaultCellSize, zoomStep, getColor, emptyFunction, styleContainer };