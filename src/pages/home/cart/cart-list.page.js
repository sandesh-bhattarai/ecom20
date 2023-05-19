import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import orderSvc from "../../../services/order.service";
import { Button, Col, Container, Row } from "react-bootstrap";
import {FaMinus, FaPlus} from "react-icons/fa"
import { setCartList } from "../../../reducer/cart.reducer";
import { NavLink } from "react-router-dom";
const CartList = () => {
    let [cartDetail, setCartDetail] = useState();
    let [totalAmt, setTotalAmt] = useState(0)
    const dispatch = useDispatch();

    let cartItem = useSelector((rootstore)=>{
        return rootstore.Cart?.list
    })

    const loadCartDetail = useCallback(async() => {
        try{
            let response = await orderSvc.listCartDetail(cartItem)
            setCartDetail(response.result.cart)
            setTotalAmt(response.result.totalAmt)
        } catch(err) {
            console.log({err})
        }
    }, [cartItem])

    useEffect(() => {
        if(cartItem){
            loadCartDetail()
        }
    }, [cartItem])
    return (<>
        <Container className="bg-light mb-5">
            <Row className="my-3">
                <Col>
                    <h4 className="text-center">Cart List: </h4>
                </Col>
            </Row>
            <hr/>
            <Row className="my-5">
                <Col>
                    <table className="table table-bordered table-hover table-stripped table-sm">
                        <thead className="table-dark">
                            <tr>
                                <th>Title</th>
                                <th>Image</th>
                                <th>Price(NPR.)</th>
                                <th>Qty</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cartDetail && cartDetail.map((cartItem, index) => (
                                    <tr key={index}>
                                        <td>{cartItem.title}</td>
                                        <td>
                                            <img src={process.env.REACT_APP_IMAGE_URL+"/"+cartItem.image} className="img img-fluid img-thumbnail" alt="" style={{maxWidth: "100px"}}/>
                                        </td>
                                        <td>{cartItem.actualPrice}</td>
                                        <td>
                                            <Button
                                                onClick={(e) => {
                                                    dispatch(setCartList({
                                                        productId: cartItem.productId,
                                                        qty: Number(cartItem.qty) - 1
                                                    }))
                                                }}
                                            variant="warning" size="sm" className="circle me-1">
                                                <FaMinus></FaMinus>
                                            </Button>
                                            {cartItem.qty}
                                            <Button 
                                            onClick={(e) => {
                                                dispatch(setCartList({
                                                    productId: cartItem.productId,
                                                    qty: Number(cartItem.qty) + 1
                                                }))
                                            }}
                                            variant="warning" size="sm" className="circle ms-1">
                                                <FaPlus></FaPlus>
                                            </Button>
                                        </td>
                                        <td>{cartItem.amount}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                        <tfoot>
                            <tr>
                                <th colSpan={4} className="text-end">Total Amount:</th>
                                <th>
                                    Npr. {totalAmt}
                                </th>
                            </tr>
                        </tfoot>
                    </table>
                    <NavLink className="btn btn-success btn-sm" to="/checkout">
                        Proceed to Checkout
                    </NavLink>
                </Col>
            </Row>

        </Container>
    </>)
}

export default CartList;