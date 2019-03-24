import React from 'react';
import { Card, CardImg, CardText, CardBody, 
  CardTitle, Breadcrumb, BreadcrumbItem, Button, Col, Modal, ModalHeader, ModalBody, Row, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len)
const minLength = (len) => (val) => (val) && (val.length >= len)
class CommentForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isNavOpen: false,
      isModalOpen: false
    };
    this.toggleModal = this.toggleModal.bind(this);

  }

  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }
  handleSubmit(values) {
    this.props.addComment(this.props.dishId, values.rating, values.author, values.comment)
  }
  render() {
    return (
      <div>
        <Button onClick={this.toggleModal} outline><span className="fa fa-lg fa-pencil"></span> Submit Comment</Button>
        <div>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row>
                <Col md={12}>
                  <Label htmlFor="rating">Rating</Label>
                  <Control.select model=".rating" name="rating" id="rating" className="form-control">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col md={12}>
                  <Label htmlFor="author">Your Name</Label>
                  <Control.text model=".author"
                      className="form-control"
                      id="author" 
                      name="author" 
                      placeholder="Your Name"
                      validators={{required, minLength: minLength(3), maxLength: maxLength(15)}}
                    />
                  <Errors 
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{ 
                      required: '*Reqiured ',
                      minLength: '*Must be greater than 2 characters ',
                      maxLength: '*Must be 15 characters or less '
                    }}
                  />                
                </Col>
              </Row>
              <Row className="mt-3">
                <Col md={12}>
                  <Label htmlFor="comment">Comment</Label>
                  <Control.textarea model=".comment" id="comment" name="comment" rows="8" className="form-control" />
                </Col>
              </Row>
              
              <Button type="submit" value="submit" color="primary" className="mt-3">Submit</Button>
            </LocalForm>
          </ModalBody>
        </Modal>
        </div>
      </div>
      
    )
  }
}
const RenderDish = ({ dish, isLoading, errMess }) => {
  if (isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    )
  }
  else if (errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{errMess}</h4>
        </div>
      </div>
    )
  }
  else if(dish != null) {
    return (
      <Card>
        <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    );
  } else {
    return (
      <div></div>
    );
  }
}

const RenderComments = ({ comments, addComment, dishId }) => {

    
  if(comments != null) {
    const dishComments = comments.map((comment) => {
      return (
        <div key={comment.id}>
            <div>
              <p>{comment.comment}</p>
              <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', {year: 'numeric', month:'short', day: '2-digit'}).format(new Date(Date.parse(comment.date))) }</p>
            </div>
        </div>
      )
    })
  
    return (
      <div>
        
        <h4>Comments</h4>
        <ul className="list-unstyled">
          {dishComments}
        </ul>
        <CommentForm dishId={dishId} addComment={addComment} />
      </div>
    )
  } else {
    return (
      <div></div>
    )
  }
  
}
const DishDetail = (props) => {

    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>                
        </div>
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={props.dish} isLoading={props.isLoading} errMess={props.errMess} />
          </div>
          <div className="col-12 col-md-5 m-1">
            <RenderComments comments={props.comments}
              addComment={props.addComment}
              dishId={props.dish.id} />
            
          </div>
          <div>
            
          </div>
        </div>
      </div>
    )
  }


export default DishDetail;