/** @jsx React.DOM */

// React stores 2 copies of the DOM, one for its state before a change, and one for after.
// As changes occur, React diffs changes between these two Virtual DOM trees and streams them to the real DOM.
// Sending the minimal amount of changes saves a lot of time, as modifying and querying the actual DOM is a huge performance bottleneck.

var PageTitle = React.createClass({
    getInitialState : function() {
        return {
            name : "eniz",
            job  : "developer"
        };
    },
    render : function() {
        return <h1>
        My name is <b>{this.state.name}</b> and I am a <b>{this.state.job}</b>.
        </h1>;
    }
});


var Button = React.createClass({
    actionButton: function () {
        alert("I am a button");
    },
    render: function () {
       return (
          <button className="btn btn-primary" onClick={this.actionButton}>
              <span>{this.props.text}</span>
          </button>
       );
   }
});

var App = React.createClass({
   render: function () {
       return (
         <div>
             <PageTitle />
             <Button text="Button" />
         </div>
       );
   }
});
React.renderComponent(
    <App  />,
    document.getElementById('example')
)