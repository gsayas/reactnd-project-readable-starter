import React, { Component } from 'react';
import Modal from 'react-modal';
import Loading from 'react-loading';

class ModalForm extends Component {
  state = {
    modalOpen: false,
    isSavingForm: false,
    formBody: '',
    formAuthor: '',
    formTitle: '',
    formPristine: true
  }

  handleModalOpen = () => {
    const {entity} = this.props;
    this.setState(() => ({
      modalOpen: true,
      formAuthor: entity !== undefined ? entity.author : '',
      formBody: entity !== undefined ? entity.body : '',
      formTitle: entity !== undefined ? entity.title : ''
    }));
  }

  handleModalClose = () => {
    this.setState(() => ({
      modalOpen: false,
      formAuthor: '',
      formBody: '',
      formTitle: '',
      isSavingForm: false
    }));
  }

  handleChange = (newState) => {
    this.setState(newState);
  }

  componentDidMount() {
    this.props.onRef(this)
  }

  handleSubmitForm = (e) => {
    e.preventDefault();
    this.setState(() => ({ isSavingForm: true }))
    this.props.onModalSubmit({author: this.state.formAuthor, body: this.state.formBody, title: this.state.formTitle});
  }

  render() {
    const {modalOpen, isSavingForm} = this.state;
    const {isEditMode, title, showTitleField} = this.props;

    return (
      <div className='modal-form-wrapper'>
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={modalOpen}
          onRequestClose={()=>this.handleModalClose()}
          contentLabel='Modal'
        >
          <div>
            {isSavingForm === true
              ? <Loading delay={200} type='spin' color='#222' className='loading' />
              : <form onSubmit={this.handleSubmitForm}>
                <h3 className='sub-header'>
                  {title}
                </h3>
                <div className='modal-form'>
                  {!isEditMode
                    ?<input
                      className='author-input'
                      type='text'
                      placeholder='Author'
                      value={this.state.formAuthor}
                      onChange={(event)=>this.handleChange({formAuthor: event.target.value})}
                    />:''}
                  {showTitleField
                    ?<input
                      className='title-input'
                      type='text'
                      placeholder='Title'
                      value={this.state.formTitle}
                      onChange={(event)=>this.handleChange({formTitle: event.target.value})}
                    />:''}
                  <textarea
                    rows="4"
                    cols="30"
                    className='body-input'
                    placeholder='post here!'
                    value={this.state.formBody}
                    onChange={(event)=>this.handleChange({formBody: event.target.value})}
                  />
                  <button type="submit" disabled={false || isSavingForm}>{/*TODO: disable submit if form is empty*/}
                    Submit
                  </button>
                </div>
              </form>}
          </div>
        </Modal>
      </div>
    )
  }

}
export default ModalForm;