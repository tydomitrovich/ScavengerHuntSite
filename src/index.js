import React from 'react';
import ReactDOM from 'react-dom';
import Notifications, {notify} from 'react-notify-toast';
import './index.css';
import block from './mystery_block.jpg';

/*
 * TODO: Add JSON Loading for QA
 *
 */

class Prompt extends React.Component {
  render() {
    return (
      <div>
        <div className="promptHeader">
          <h2>Step {this.props.step} of 4</h2>
        </div>
        <div className="promptBody">
          <p>{this.props.instructions}</p>
        </div>
      </div>
    );
  }
}

class ScavengerHunt extends React.Component {
  constructor() {
    super();
    this.prompts = [
      "There is a mystery box in the art center. Feel inside and guess what is there. No Peeking!",
      "You must SCAN one of the following areas for the answer you seek: The electric tower, the center of arts, the transit hub.",
      "Send a picture of people doing the YMCA to kahtnipp@gmail.com. You will receive the code you seek",
      "Decode the following: vqpuymefqd. HINT: Who are the Seahawks fans?",
      "Congratulations! You have won! The combination is: 996"
    ]
    this.answers = [
      "foil",
      "secret.located",
      "jack_and_jill_is_a_film_masterpiece",
      "jedimaster"
    ]
    this.maxSteps = 3
    this.currGuess = ''
    this.state = {
      currStep: 0,
    }
  }

  checkAnswer(){
    var fmtGuess = this.currGuess.trim().toLowerCase();
    if(fmtGuess === this.answers[this.state.currStep]){
      notify.show('Correct Answer!', 'success', 3000);
      this.setState({currStep: (this.state.currStep + 1)});
      var inputBar = document.getElementsByClassName('submitBar');
      if(inputBar !== undefined && inputBar.length > 0 ){
      	inputBar[0].value = '';
      }
    }else{
      notify.show('That is not the correct answer', 'error', 3000);
    }
  }

  updateGuess(guess) {
    this.currGuess = guess.target.value;
  }

  handleSubmit(evt) {
    if(evt.keyCode === 13) {
    	this.checkAnswer();
    }
  }

  renderSubmitBar(){
    if(this.state.currStep <= this.maxSteps) {
      return (
        <div>
          <input className="submitBar" onKeyDown={evt => this.handleSubmit(evt)}  onChange={evt => this.updateGuess(evt)}/>
	  <span><button onClick={() => this.checkAnswer()}>Submit</button></span>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="scavengerHuntContainer">
        <Notifications />
        <h1>Congratulations! You Discovered A Secret Scavenger Hunt!</h1>
        <h3>If you complete all {this.maxSteps + 1} challenges, you will receive a code.</h3>
        <h3>This code will open a lockbox on top of the vending machines in Otto Miller Hall which contains a prize.</h3>
        <h3>All items involved with the hunt are marked with the question mark symbol.</h3>
        <img src={block} alt="Mystery Block" height="200" width="200"/>
        <br/>
        <div className="promptsContainer">
            <Prompt step={(this.state.currStep)} instructions={this.prompts[this.state.currStep]} />
            {this.renderSubmitBar()}
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <ScavengerHunt />,
  document.getElementById('root')
);
