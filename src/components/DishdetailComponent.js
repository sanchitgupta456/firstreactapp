import React  from 'react';
import {Card,CardImg,CardImgOverlay,CardBody,CardText , CardTitle,BreadcrumbItem,Breadcrumb} from 'reactstrap'
import {Link} from 'react-router-dom'
import CommentForm from './CommentFormComponent';
import {Loading} from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

    function RenderDish({dish})
    {
        if(dish!=null)
        {
            return(
                    <div key={dish.id}>
                        <FadeTransform in transformProps={{
                            exitTransform: 'scale(0.5) translateY(-50%)'
                        }}>
                <Card>
                    <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                       
                    <CardBody>
                    <CardTitle >{dish.name}</CardTitle>
                        {dish.description}
                    </CardBody>
                </Card>
                </FadeTransform>
            </div>
                                
            );
        }
        else{
            return(
                <div></div>
            );
        }
        
    }

    function RenderComments({commentsprop})
    {
        const comments2 = commentsprop.map((comment1) =>{
                //var formattedDate = format(comment1.date , "MMMM Do, YYYY H:mma");
                return(
                    <Fade in>
                    <div key={comment1.id}>
                            <div className="row">
                                    {comment1.comment}
                                </div>
                                <div className="row">
                                    <p>--{comment1.author} ,
                                {new Intl.DateTimeFormat('en-US', {year: 'numeric',month:'short',day:'2-digit'}).format(new Date(Date.parse(comment1.date)))} 
                                    </p>
                                    
                                </div>
                    </div>
                    </Fade>
                );
            })

            return(
                <div>
                <Stagger in>
                {comments2}
                </Stagger>
                </div>
              
            );
           
        
    }

    const Dishdetail = (props) => {
        if(props.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if(props.errMess) {
            return (
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if(props.dish!=null)
        {
            return(
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr/>
                    </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                    <RenderComments commentsprop={props.comments} />
                    <CommentForm postComment={props.postComment} dishId={props.dish.id}/>
                    </div>

                
                </div>
                </div>
            );
         
        }
        else{
            return(
                <div></div>
            );
        }
    }




export default Dishdetail ;