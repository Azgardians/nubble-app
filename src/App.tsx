import './App.scss'

function TopBlock ({letterName}: {letterName: string}) {
  return (
    <div className='borderBox d-flex align-item'>
      <span className='borderValue'>{letterName}</span>
    </div>
  )
}

function Block ({valueArr, index}: {valueArr: number[], index: number}) {
  return (
    <div className='d-flex m-0'>
      {valueArr.map((item: number, j: number) => (
        <div className='boxBlock d-flex align-items-center justify-content-center' key={'' + item + index + j}>
          <span className='boxValue'>{item === 0 ? '' : item}</span>
        </div>
      ))}
    </div>
  )
}

// This is the board structure
function Board () {
  const letterValues: string[] = ['N','U','B','B','L','E'];
  const values = randomAssigningValue();

  return (
    <div>
      <div className="d-flex flex-column">
        <div className="level-1">
          <div className="container1">
            {letterValues.map((item:string, index: number) => (
              <TopBlock letterName={item.toUpperCase()} key={'' + item+index} />
            ))}
          </div>
        </div>
        <div className="level-2 pt-5 d-flex justify-content-center">
          <div className='mt-5 me-5 pe-3'>
            {values.map(((iarr: number[], i: number) => (
              <Block valueArr={iarr} index={i} key={i} />
            )))}
          </div>
        </div>
      </div>
    </div>
  )
}

// This shuffle function is copied from https://bost.ocks.org/mike/shuffle/

function shuffleArray (array: number[]) {
  let m = array.length, t, i;
  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);
    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

function randomAssigningValue () {
  const arrayValues = shuffleArray([1,2,3,4,5,6,7,8,0]);

  let twodArray: number[][] = [];
  let count = 0;
  for (let i =0; i<3; i++) {
    twodArray[i] = [];
    for (let j=0; j<3; j++) {
      twodArray[i][j] = arrayValues[count];
      count++;
    }
  }
  return twodArray;
}

function checkValidation (squareValues: number[]) {
  let returnValue = true;
  for (let i=0; i<squareValues.length; i++) {
    if (i === 8 && squareValues[i] === 0) {
      returnValue = true;
    } else if (squareValues[i] !== i+1) {
      returnValue = false;
      break;
    }
  }
  return returnValue;
}

function App() {
  return (
    <>
      <Board />
    </>
  )
  
}

export default App
