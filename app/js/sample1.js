/** @jsx React.DOM */

// React stores 2 copies of the DOM, one for its state before a change, and one for after.
// As changes occur, React diffs changes between these two Virtual DOM trees and streams them to the real DOM.
// Sending the minimal amount of changes saves a lot of time, as modifying and querying the actual DOM is a huge performance bottleneck.

var PageTitle = React.createClass({
    getInitialState : function() {
        return {
            name : "eniz",
            job  : "developer",
            avatarUrl: "https://avatars.githubusercontent.com/u/1782708?v=2"
        };
    },
    render : function() {
        return (
            <h1>
            <img src={this.state.avatarUrl} width="200" height="200" className="img-circle"/>
            My name is <b>{this.state.name}</b> and I am a <b>{this.state.job}</b>.
            </h1>
            );
    }
});

var UserGist = React.createClass({
    getInitialState: function() {
        return {
            username: 'enzglk',
            lastRepoName: '',
            lastRepoUrl: '',
            repoDescription: ''
        };
    },

    componentDidMount: function() {
        $.get(this.props.source, function(result) {
            var lastRepo = result[0];
            if (this.isMounted()) {
                this.setState({
                    username: lastRepo.owner.login,
                    lastRepoName: lastRepo.name,
                    lastRepoUrl: lastRepo.html_url,
                    repoDescription: lastRepo.description
                });
            }
        }.bind(this));
    },

    render: function() {
        return (
            <div>
                My last github repo name is <b>{this.state.lastRepoName}</b> and link is <b><a href={this.state.lastRepoUrl}>here</a></b>.
                <p>It is about <b>{this.state.repoDescription}</b>.</p>
            </div>
            );
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
             <UserGist source="https://api.github.com/users/enzglk/repos?sort=created" />
         </div>
       );
   }
});
React.renderComponent(
    <App  />,
    document.getElementById('example')
)