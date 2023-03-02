import React from "react"
import firebase from 'firebase/app'
import 'firebase/database'
import config from "./config"
class Connector extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isConnected: false,
      database: null,
      myId: '',
      recieverId:'',
      
    }
  } 
    componentDidMount = async () => {
      firebase.initializeApp(config)
  
      this.setState({
        database: firebase.database()
      })
    }

    shouldComponentUpdate (nextProps, nextState) {
      if(this.state.database!==nextState.database){
        return false;
      }
      return true
    }

    connect = async () => {
      try {
        const {database,myId}=this.state;

        await database.ref('/notifs/'+myId).remove()
        await database.ref('/notifs'+myId).on('value',snapshot=>{
          if(snapshot.exists()){
            const notif=snapshot.val()

          }
        })
      } catch (e) {
        console.log(error(e))
      }
    }
  }

  render () {
    const {myId}=this.state;
    return <div>
      {this.state.isConnected ? <div>
        <h2>Hello:</h2>
        <input placeholder='to' value={''} onChange{(e) => console.log(e.target.value)} />
        </div>
        }
    </div>
  }

  export default Connector