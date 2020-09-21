import React, { Component } from "react";
import Checkbox from "./components/Checkbox";

/**
 * Table that contains the names to generate the checkboxes
 * @type {string[]}
 */
const OPTIONS = ["Item 1", "Item 2", "Item 3", "Item 4"];

class App extends Component {

  state = {
    checkboxes: OPTIONS.reduce(
        (options, option) => ({
          ...options,
          [option]: false
        }),
        {}
    )
  };

  /**
   * Allow all the checkboxes to match the select-all checkbox state
   */
  selectAllCheckboxes = () => {
    const checked = document.getElementById("select-all").checked;
    Object.keys(this.state.checkboxes).forEach(checkbox => {
      this.setState(prevState => ({
        checkboxes: {
          ...prevState.checkboxes,
          [checkbox]: checked
        }
      }));
    });
  };

  /**
   * Change the state of the single checkboxe
   * @param changeEvent
   */
  onChangeEvent = changeEvent => {
    const { name } = changeEvent.target;
    this.setState(prevState => ({
      checkboxes: {
        ...prevState.checkboxes,
        [name]: !prevState.checkboxes[name]
      }
    }));
  };

  /**
   * Create checkboxes from class checkbox with params
   * @param option
   * @returns {*}
   */
  createCheckbox = option => (
      <Checkbox
          label={option}
          isSelected={this.state.checkboxes[option]}
          onCheckboxChange={this.onChangeEvent}
          key={option}
      />
  );

  /**
   * Create checkboxes with the Array Options
   * @returns {unknown[]}
   */
  createCheckboxes = () => OPTIONS.map(this.createCheckbox);

  render() {
    return (
        <div>
            <Checkbox
                id="select-all"
                label="Select All"
                onCheckboxChange={this.selectAllCheckboxes}
                key="Select All"
            />
            {this.createCheckboxes()}
        </div>
    );
  }
}

export default App;
