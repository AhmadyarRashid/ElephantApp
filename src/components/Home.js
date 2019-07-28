import React from "react";
import Header from './Layout/Navbar';
import Sidebar from './Layout/Sidebar';
import axios from 'axios';


class Home extends React.Component {

  constructor(props) {
    super(props);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);


    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      calls_made: 0,
      sms_sent: 0,
      emails_sent: 0,
      call_yes: 0,
      call_no: 0,
      call_unknown: 0,
      chat_started: 0,
      chat_done: 0,
      chat_unknown: 0,
      campigns: [],
      selectedUser: 'Select User',
      user_id: 1,
      selectedCampigns: ''
    }
  }

  componentWillMount() {

    try {
      let user_id = localStorage.getItem('user_id');
      this.setState({
        user_id
      })
    } catch (e) {
      alert('Please Login Again');
    }

    axios.get('http://system.elepha.io/api/v1/campaigns')
      .then(res => {
        console.log('All Campigns : ', res);
        let res2 = res.data.filter(i => i.elephauser == this.state.user_id);
        this.setState({
          campigns: res2
        })

        res2.forEach((i, index) => {
          if (index == 0) {
            this.setState({
              selectedCampigns: i.pk
            })
          }
        });
      }).catch(e => {

      })

    axios.get('http://system.elepha.io/api/v1/overview')
      .then(res => {

        let res2 = res.data;

        let selectedData = res2.filter(i => i.campaign == this.state.selectedCampigns);
        if (selectedData.length > 0) {
          this.setState({
            calls_made: selectedData[0].calls_made,
            sms_sent: selectedData[0].sms_sent,
            emails_sent: selectedData[0].emails_sent,
            call_yes: selectedData[0].call_yes,
            call_no: selectedData[0].call_no,
            call_unknown: selectedData[0].call_unknown,
            chat_started: selectedData[0].chat_started,
            chat_done: selectedData[0].chat_done,
            chat_unknown: selectedData[0].chat_unknown
          })
        } else {
          this.setState({
            calls_made: 0,
            sms_sent: 0,
            emails_sent: 0,
            call_yes: 0,
            call_no: 0,
            call_unknown: 0,
            chat_started: 0,
            chat_done: 0,
            chat_unknown: 0
          })
        }

      }).catch(e => {
        console.log(e);
      })



  }


  handleMenuClick(e) {

    this.setState({
      selectedCampigns: e.target.value
    })

    axios.get('http://system.elepha.io/api/v1/overview')
      .then(res => {
        let res2 = res.data;

        let selectedData = res2.filter(i => i.campaign == this.state.selectedCampigns);
        if (selectedData.length > 0) {
          this.setState({
            calls_made: selectedData[0].calls_made,
            sms_sent: selectedData[0].sms_sent,
            emails_sent: selectedData[0].emails_sent,
            call_yes: selectedData[0].call_yes,
            call_no: selectedData[0].call_no,
            call_unknown: selectedData[0].call_unknown,
            chat_started: selectedData[0].chat_started,
            chat_done: selectedData[0].chat_done,
            chat_unknown: selectedData[0].chat_unknown
          })
        } else {
          this.setState({
            calls_made: 0,
            sms_sent: 0,
            emails_sent: 0,
            call_yes: 0,
            call_no: 0,
            call_unknown: 0,
            chat_started: 0,
            chat_done: 0,
            chat_unknown: 0
          })
        }

      }).catch(e => {
        //  console.log(e);
      })
  }


  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
    //  console.log(this.state.campigns);

    const menu1 = this.state.campigns.map(i => (
      <option key={i.pk} value={i.pk}>
        {i.name}
      </option>
    ));

    return (
      <section>
        <Header />
        <Sidebar />
        <div className="main-content w-100">
          <div className="page-header col-12" style={{ marginTop: -80 }}>
            <h1>Overview</h1>
            <div className="d-flex no-block flex-wrap align-items-start">
              <div className="form-group col-4">
                <div className="row">Campaign :
                  <select className="form-control" onChange={e => this.handleMenuClick(e)}>
                    {menu1}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex no-block flex-wrap mx-3" style={{ marginTop: -80 }}>
            <div className="card flex-row col-xl-4 mt-3">
              <div className="d-flex no-block align-items-center flex-wrap border w-100 p-3">
                <i class="fas fa-phone-square-alt fa-7x"></i>
                <div className="card-body col-9">
                  <h3 className="card-text">Calls - made</h3>
                </div>
                <div className="card-footer">
                  <a href="#" className="btn btn-primary">{this.state.calls_made}</a>
                </div>
              </div>
            </div>
            <div className="card flex-row col-xl-4 mt-3">
              <div className="d-flex no-block align-items-center flex-wrap border w-100 p-3">
                <i class="far fa-comments fa-7x"></i>
                <div className="card-body col-9">
                  <h3 className="card-text">Sms - sent</h3>
                </div>
                <div className="card-footer">
                  <a href="#" className="btn btn-primary">{this.state.sms_sent}</a>
                </div>
              </div>
            </div>
            <div className="card flex-row col-xl-4 mt-3">
              <div className="d-flex no-block align-items-center flex-wrap border w-100 p-3">
                <i class="fas fa-envelope-open-text fa-7x"></i>
                <div className="card-body col-9">
                  <h3 className="card-text">Emails - sent</h3>
                </div>
                <div className="card-footer">
                  <a href="#" className="btn btn-primary">{this.state.emails_sent}</a>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex no-block flex-wrap mx-3">
            <div className="card flex-row col-xl-4 mt-3">
              <div className="d-flex no-block align-items-center flex-wrap border w-100 p-3">
                <i class="fas fa-phone-square-alt fa-7x"></i>
                <div className="card-body col-9">
                  <h3 className="card-text">Call - yes</h3>
                </div>
                <div className="card-footer">
                  <a href="#" className="btn btn-primary">{this.state.call_yes}</a>
                </div>
              </div>
            </div>
            <div className="card flex-row col-xl-4 mt-3">
              <div className="d-flex no-block align-items-center flex-wrap border w-100 p-3">
                <i class="fas fa-phone-slash fa-7x"></i>
                <div className="card-body col-9">
                  <h3 className="card-text">Call - no</h3>
                </div>
                <div className="card-footer">
                  <a href="#" className="btn btn-primary">{this.state.call_no}</a>
                </div>
              </div>
            </div>
            <div className="card flex-row col-xl-4 mt-3">
              <div className="d-flex no-block align-items-center flex-wrap border w-100 p-3">
                <i class="fas fa-phone-alt fa-7x"></i>
                <div className="card-body col-9">
                  <h3 className="card-text">Call - unknown</h3>
                </div>
                <div className="card-footer">
                  <a href="#" className="btn btn-primary">{this.state.call_unknown}</a>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex no-block flex-wrap mx-3">
            <div className="card flex-row col-xl-4 mt-3">
              <div className="d-flex no-block align-items-center flex-wrap border w-100 p-3">
                <i class="fas fa-comments fa-7x"></i>
                <div className="card-body col-9">
                  <h3 className="card-text">Chat - started</h3>
                </div>
                <div className="card-footer">
                  <a href="#" className="btn btn-primary">{this.state.chat_started}</a>
                </div>
              </div>
            </div>
            <div className="card flex-row col-xl-4 mt-3">
              <div className="d-flex no-block align-items-center flex-wrap border w-100 p-3">
                <i class="far fa-comments fa-7x"></i>
                <div className="card-body col-9">
                  <h3 className="card-text">Chat - done</h3>
                </div>
                <div className="card-footer">
                  <a href="#" className="btn btn-primary">{this.state.chat_done}</a>
                </div>
              </div>
            </div>
            <div className="card flex-row col-xl-4 mt-3">
              <div className="d-flex no-block align-items-center flex-wrap border w-100 p-3">
                <i class="fas fa-comment-dots fa-7x"></i>
                <div className="card-body col-9">
                  <h3 className="card-text">Chat - unknown</h3>
                </div>
                <div className="card-footer">
                  <a href="#" className="btn btn-primary">{this.state.chat_unknown}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    );
  }
}
export default Home;
