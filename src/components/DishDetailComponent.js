import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';


const RenderDish = ({ dish }) => {
  if(dish != null) {
    return (
      <Card>
        <CardImg width="100%" src={dish.image} alt={dish.name} />
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

const RenderComments = ({ dish }) => {

    
  if(dish != null) {
    const comments = dish.comments.map((comment) => {
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
          {comments}
        </ul>
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
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={props.selectedDish} />
          </div>
          <div className="col-12 col-md-5 m-1">
            <RenderComments dish={props.selectedDish} />
          </div>
        </div>
      </div>
    )
  }


export default DishDetail;