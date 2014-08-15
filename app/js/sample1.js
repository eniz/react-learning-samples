/** @jsx React.DOM */

// React stores 2 copies of the DOM, one for its state before a change, and one for after.
// As changes occur, React diffs changes between these two Virtual DOM trees and streams them to the real DOM.
// Sending the minimal amount of changes saves a lot of time, as modifying and querying the actual DOM is a huge performance bottleneck.

var Button = React.createClass({
    actionButton: function () {
        alert("Ben bir butonum");
    },
    render: function () {
       return (
          <button className="btn btn-primary" onClick={this.actionButton}>
              <span>{this.props.text}</span>
          </button>
       );
   }
});


React.renderComponent(
    <Button text="Book"  />,
    document.getElementById('example')
)