import React, { Component } from 'react';
import axios from 'axios';
import Header from './Layout/Navbar';
import Sidebar from './Layout/Sidebar';

class Configurations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            campigns: [],
            selectedCampignDetails: [],
            userId: 1,
            selectedCampaign: 1,
            pk: '',
            sms_yes: '',
            sms_no: '',
            sms_unknown: '',
            email_yes: '',
            email_no: '',
            email_unknown: '',
            ivr_yes: '',
            ivr_no: '',
            formStatus: 'Save',
            flow_one: false,
            flow_two: false,
            flow_three: false,
            msg : ''
        }
    }

    componentDidMount() {
        try {
            let userId = localStorage.getItem('user_id');
            this.setState({
                userId
            })
        } catch (e) {
            this.setState({
                userId: 1
            })
        }


        axios.get('http://system.elepha.io/api/v1/campaigns')
            .then(res => {
                let res2 = res.data.filter(i => i.elephauser == this.state.userId);
                this.setState({
                    campigns: res.data
                })
                if (res.data.length > 0) {
                    this.setState({
                        selectedCampaign: res.data[0].pk
                    })
                }
            }).catch(e => {
               
            })


        this.fillFormAcordingToCampign();

    }

    fillFormAcordingToCampign() {
        axios
            .get('http://system.elepha.io/api/v1/communication/')
            .then(res => {
                if (res) {
                    let getConfigDetail = res.data.filter(i => i.campaigns == this.state.selectedCampaign);

                    if (getConfigDetail.length > 0) {
                        this.setState({
                            pk: getConfigDetail[0].pk,
                            sms_yes: getConfigDetail[0].sms_yes,
                            sms_no: getConfigDetail[0].sms_no,
                            sms_unknown: getConfigDetail[0].sms_unknown,
                            email_yes: getConfigDetail[0].email_yes,
                            email_no: getConfigDetail[0].email_no,
                            email_unknown: getConfigDetail[0].email_unknown,
                            ivr_yes: getConfigDetail[0].ivr_yes,
                            ivr_no: getConfigDetail[0].ivr_no,
                            flow_one: getConfigDetail[0].flow_one,
                            flow_two: getConfigDetail[0].flow_two,
                            flow_three: getConfigDetail[0].flow_three,
                            formStatus: 'Update'
                        })
                    } else {
                        this.resetFields()
                    }

                }
            }).catch(e => {
                // console.log(e);
               this.resetFields()
            });
    }

    resetFields(){
        this.setState({
            sms_yes: '',
            sms_no: '',
            sms_unknown: '',
            email_yes: '',
            email_no: '',
            email_unknown: '',
            ivr_yes: '',
            ivr_no: '',
            flow_one: false,
            flow_two: false,
            flow_three: false,
            formStatus: 'Save'
        })
    }

    handlerMenu = e => {
        this.setState({
            selectedCampaign: e.target.value
        })
        this.fillFormAcordingToCampign();
    }

    handlerForm = e => {
        e.preventDefault();
        if (this.state.formStatus == 'Save') {
            axios
                .post('http://system.elepha.io/api/v1/communication/', {
                    "campaigns": this.state.selectedCampaign,
                    "sms_yes": this.state.sms_yes,
                    "sms_no": this.state.sms_no,
                    "sms_unknown": this.state.sms_unknown,
                    "email_yes": this.state.email_yes,
                    "email_no": this.state.email_no,
                    "email_unknown": this.state.email_unknown,
                    "ivr_yes": this.state.ivr_yes,
                    "ivr_no": this.state.ivr_no,
                    "flow_one": this.state.flow_one,
                    "flow_two": this.state.flow_two,
                    "flow_three": this.state.flow_three
                })
                .then(res => {
                    if (res) {
                        this.setState({
                            msg : 'Add Successfully'
                        })
                        this.resetFields()
                        setTimeout(() => {
                            this.setState({
                                msg : ''
                            }) 
                        }, 3000);
                    }
                }).catch(e => {
                    // console.log(e);
                })
        }
        if (this.state.formStatus == 'Update') {
              axios
                .patch(`http://system.elepha.io/api/v1/communication/${this.state.pk}/`, {
                    "campaigns": this.state.selectedCampaign,
                    "sms_yes": this.state.sms_yes,
                    "sms_no": this.state.sms_no,
                    "sms_unknown": this.state.sms_unknown,
                    "email_yes": this.state.email_yes,
                    "email_no": this.state.email_no,
                    "email_unknown": this.state.email_unknown,
                    "ivr_yes": this.state.ivr_yes,
                    "ivr_no": this.state.ivr_no,
                    "flow_one": this.state.flow_one,
                    "flow_two": this.state.flow_two,
                    "flow_three": this.state.flow_three
                })
                .then(res => {
                    if (res) {
                        this.setState({
                            msg : 'Update Successfully'
                        })
                        this.resetFields()
                        setTimeout(() => {
                            this.setState({
                                msg : ''
                            }) 
                        }, 3000);
                    }
                }).catch(e => {
                    // console.log(e);
                })
        }
    }



    render() {
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
                        <h1>Configurations</h1>
                        <div className="d-flex no-block flex-wrap align-items-start">
                            <div className="form-group col-4">
                                <div className="row">
                                    Campaign :
                                        <select className="form-control" onClick={e => this.handlerMenu(e)}>
                                        {menu1}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main-content w-100" style={{ marginTop: -80 }}>
                    <form class="frm" onSubmit={(e) => this.handlerForm(e)}>
                        <br />
                        {this.state.msg == '' ? '' : <div class="alert alert-success" role="alert"> {this.state.msg} </div>}

                        <div class="form-group">
                            <input type="text" required class="form-control" value={this.state.sms_yes} onChange={e => this.setState({ sms_yes: e.target.value })} ref="Sms Yes" placeholder="Sms Yes" />
                        </div>
                        <div class="form-group">
                            <input type="text" required value={this.state.sms_no} onChange={e => this.setState({ sms_no: e.target.value })} class="form-control" ref="Sms No" placeholder="Sms No" />
                        </div>
                        <div class="form-group">
                            <input type="text" required value={this.state.sms_unknown} onChange={e => this.setState({ sms_unknown: e.target.value })} class="form-control" ref="Sms Unknown" placeholder="Sms Unknown" />
                        </div>
                        <div class="form-group">
                            <input type="text" required value={this.state.email_yes} onChange={e => this.setState({ email_yes: e.target.value })} class="form-control" ref="Email Yes" placeholder="Email Yes" />
                        </div>
                        <div class="form-group">
                            <input type="text" required value={this.state.email_no} onChange={e => this.setState({ email_no: e.target.value })} class="form-control" ref="Email No" placeholder="Email No" />
                        </div>
                        <div class="form-group">
                            <input type="text" required value={this.state.email_unknown} onChange={e => this.setState({ email_unknown: e.target.value })} class="form-control" ref="Email Unknown" placeholder="Email Unknown" />
                        </div>
                        <div class="form-group">
                            <input type="text" required value={this.state.ivr_yes} onChange={e => this.setState({ ivr_yes: e.target.value })} class="form-control" ref="Ivr Yes" placeholder="Ivr Yes" />
                        </div>
                        <div class="form-group">
                            <input type="text" required value={this.state.ivr_no} onChange={e => this.setState({ ivr_no: e.target.value })} class="form-control" placeholder="Ivr No" />
                        </div>
                        <div class="form-group">
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" onChange={e => this.setState({ flow_one: e.target.checked })} checked={this.state.flow_one} />
                                <label class="form-check-label" for="inlineCheckbox1">Flow One</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" onChange={e => this.setState({ flow_two: e.target.checked })} checked={this.state.flow_two} />
                                <label class="form-check-label" for="inlineCheckbox2">Flow Two</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3" onChange={e => this.setState({ flow_three: e.target.checked })} checked={this.state.flow_three} />
                                <label class="form-check-label" for="inlineCheckbox3">Flow Three</label>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary btn-block pnk_bt">{this.state.formStatus}</button>
                        <br />
                    </form>
                </div>

            </section>
        );
    }
}


export default Configurations;