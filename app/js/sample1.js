/** @jsx React.DOM */

// React stores 2 copies of the DOM, one for its state before a change, and one for after.
// As changes occur, React diffs changes between these two Virtual DOM trees and streams them to the real DOM.
// Sending the minimal amount of changes saves a lot of time, as modifying and querying the actual DOM is a huge performance bottleneck.

var Avatar = React.createClass({
    getInitialState: function () {
        return {
            profilePic: ''
        }
    },
    componentDidMount: function () {
        $.get('http://graph.facebook.com/' + this.props.username + '/picture?redirect=0&height=168&width=168', function (result) {
            if (this.isMounted()) {
                this.setState({
                    profilePic: result.data.url
                });
            }
        }.bind(this));
    },

    render: function () {
        return (
            <img src={this.state.profilePic}  className="img-circle"/>
            );
    }
});

var PageTitle = React.createClass({
    getInitialState : function() {
        return {
            name : "eniz",
            job  : "developer",
            city: 'Istanbul, Turkey',
            twitterUrl: "https://twitter.com/enzglk"
        };
    },
    render : function() {
        return (
            <h1>
                <Avatar username="enzglk" />
            My name is
                <b>
                    <a href={this.state.twitterUrl}>{this.state.name}</a>
                </b>
            and I am a
                <b>{this.state.job}</b>
            .
                <br/>
            I live in
                <b>{this.state.city}</b>
            .
            </h1>
            );
    }
});

var UserGithub = React.createClass({
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
            <div className="panel">
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

var LikeButton = React.createClass({
    getInitialState: function () {
        return { liked: false };
    },
    handleClick: function (event) {
        this.setState({liked: !this.state.liked});
    },
    render: function () {
        var text = this.state.liked ? 'like' : 'unlike';
        return (
            <p onClick={this.handleClick}>You
                <b>{text}</b>
            this. Click to toggle.</p>
            );
    }
});

var App = React.createClass({
   render: function () {
       return (
           <div className="main-container">
             <PageTitle />
               <UserGithub source="https://api.github.com/users/enzglk/repos?sort=created" />
               <h2>UI Kits </h2>
               <Button text="Button" />
               <LikeButton />
         </div>
       );
   }
});
React.renderComponent(
    <App  />,
    document.getElementById('example')
)