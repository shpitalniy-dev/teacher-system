import React from 'react'
import Keypad from '../keypad/Keypad'
import Display from '../display/Display'
import './App.less'

const App = ({ displayValue, mode, trigUnit, dictionary, ...keypadProps }) => (
    <div className={`calculator ${mode}`}>
      <Display trigUnit={trigUnit} value={displayValue} mode={mode} />
      <Keypad trigUnit={trigUnit} {...keypadProps} />
    </div>
);

export default App
