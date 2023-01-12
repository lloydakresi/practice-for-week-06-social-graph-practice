// Implement the SocialNetwork class here
class SocialNetwork {
  constructor() {
    this.users = {};
    this.follows = {};
    this.currentID = 0;
  }

  addUser(name) {
    // Your code here
    let userObj = {"id": ++this.currentID, "name": name,};
    this.users[userObj["id"]] = userObj;
    this.follows[userObj["id"]] = new Set()
    return userObj["id"];

  }

  getUser(userID) {
    // Your code here
    return this.users[userID] || null;
  }

  follow(userID1, userID2) {
    // Your code here
    if((!this.getUser(userID1)) || (!this.getUser(userID2))) return false;

    this.follows[userID1].add(userID2);
    return true;

  }

  getFollows(userID) {
    // Your code here
    return this.follows[userID];
  }

  getFollowers(userID) {
    // Your code here
    let followers = new Set();
    for (let follower in this.follows) {
      if (this.follows[follower].has(userID)) {
        let user = this.getUser(follower);
        followers.add(user.id);
      }
    }
    return followers;
  }

  getRecommendedFollows(userID, degrees) {
    // Your code here
    let recommended = [];
    let queue = [[this.getUser(userID)]];
    let visited = new Set();

    while (queue.length > 0) {
      let path = queue.shift();
      let currentPerson = path[path.length - 1];

      if (!visited.has(currentPerson)) {
        visited.add(currentPerson);

        if (path.length > 2 && path.length - 2 <= degrees) {
          recommended.push(currentPerson.id);
        }

        let follows = this.getFollows(currentPerson.id);
        follows.forEach(
          follow => {
            let newPath = path.concat(this.getUser(follow));
            queue.push(newPath);
          }
        );
      }

    }

    return recommended;

  }
  }


module.exports = SocialNetwork;
