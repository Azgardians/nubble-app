import { useState } from 'react';
import './App.scss'

function TopBlock ({letterName}: {letterName: string}) {
  return (
    <div className='borderBox d-flex align-item'>
      <span className='borderValue'>{letterName}</span>
    </div>
  )
}

function Block ({valueArr, index, handleClick}: {valueArr: number[], index: number, handleClick: Function}) {
  return (
    <div className='d-flex m-0'>
      {valueArr.map((item: number, j: number) => (
        <div className='boxBlock d-flex align-items-center justify-content-center' key={'' + item + index + j} onClick={() => handleClick([index, j, item])}>
          <span className='boxValue'>{item === 0 ? '' : item}</span>
        </div>
      ))}
    </div>
  )
}

// This is the board structure
function Board () {
  const letterValues: string[] = ['N','U','B','B','L','E'];
  const [values , setValues]=useState(randomAssigningValue());

  const handleClick = (indexVal: number[]) => {
    console.log(indexVal, 'indexVal');
    const iIndex = indexVal[0];
    const jIndex = indexVal[1];
    const item = indexVal[2];
    let newI = 0, newJ = 0;
    let placeExist = false;
    if (item !== 0 )  {
      for (let i = 0; i<4; i++) {
        if (i === 0) {
          newI = iIndex;
          newJ = jIndex - 1;
          if (checkAuthenticity(newI , newJ)) {
            placeExist = true;
            break;
          }
        } else if (i === 1) {
          newI = iIndex;
          newJ = jIndex + 1;
          if (checkAuthenticity(newI , newJ)) {
            placeExist = true;
            break;
          }
        } else if (i === 2) {
          newI = iIndex - 1;
          newJ = jIndex;
          if (checkAuthenticity(newI , newJ)) {
            placeExist = true;
            break;
          }
        } else if (i === 3) {
          newI = iIndex + 1;
          newJ = jIndex;
          if (checkAuthenticity(newI , newJ)) {
            placeExist = true;
            break;
          }
        }
      }
      if (placeExist) {
        let copyValues = [...values];
        copyValues[newI][newJ] = item;
        copyValues[iIndex][jIndex] = 0;
        setValues(copyValues);
      }
      setTimeout(() => {
        setValues([[1,2,3],[4,5,6],[7,8,0]]);
        let validateValues = [];
        for (let j=0; j<2; j++) {
          validateValues.push(...values[j]);
        }
        const solved = checkValidation(validateValues);
        console.log(solved, 'solved');
        if (solved) {
          alert('Puzzle is solved');
        }
      },6000);
      let validateValues = [];
      for (let j=0; j<2; j++) {
        console.log(values[j]);
        validateValues.push(...values[j]);
      }
      console.log(validateValues);
      const solved = checkValidation(validateValues);
      console.log(solved, 'here also');
      if (solved) {
        alert('Puzzle is solved');
      }
    } else {
      console.log('clicking on wrong number');
    }

  }

  const checkAuthenticity = (newI: number, newJ: number) => {
    console.log(newI, newJ, 'hey values');
    if (newI >=0 && newI <= 2 && newJ >=0 && newJ <= 2) {
      console.log('here');
      const newVal = values[newI][newJ];
      if (!newVal) {
        return true;
      }
    }
    return false;
  }

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
          <div className='mt-5'>
            {values.map(((iarr: number[], i: number) => (
              <Block valueArr={iarr} index={i} key={i} handleClick={handleClick} />
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
  console.log(squareValues, 'squareValues')
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
