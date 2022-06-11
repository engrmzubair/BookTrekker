import React, { useEffect } from 'react'
import Menu from '../../core/Menu';
import Layout from '../../core/Layout';
import Search from '../../core/search/Search';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchAllProducts, getAllProducts } from './productSlice';
import { Row, Col, Container, ListGroup, ToastContainer } from 'react-bootstrap';
import Icon from '@reacticons/bootstrap-icons';
import { Link } from 'react-router-dom';
import { currentUser } from '../../user/userSlice';
import { deleteProduct } from '../../core/apiCore';
import { toast } from 'react-toastify';

type Props = {}

const ManageProducts = (props: Props) => {

  const products = useAppSelector(getAllProducts);
  const dispatch = useAppDispatch()
  const user = useAppSelector(currentUser)

  const handleDelete = async (productId: string) => {

    try {
      const res = user && await deleteProduct(productId, user._id);
      if (res?.data) {
        toast.success("Product deleted successfully.", { theme: "colored" })
        console.log("deleted project", res.data)
        dispatch(fetchAllProducts())
      }

    } catch (error) {
      console.log(error);
    }

    console.log(`Product deleted with the id of ${productId}`);
  }

  useEffect(() => {

    dispatch(fetchAllProducts())
  }, [])


  return (
    <React.Fragment>
      <ToastContainer />
      <Menu />
      <Layout
        title="Manage Products"
        description="Perform CRUD on products." >
      </Layout>
      <Search />

      <Container>
        <h2 className='text-center mb-4 fs-1 bg-success text-light p-2'
          style={ { color: "white !important" } }
        >Manage Products</h2>
        <Row>
          <Col>
            <h2
              className='fs-3 text-success my-3'
            >Total Products: { products?.length ? products.length : 0 }</h2>
            <ListGroup>

              { products?.map((p, i) =>
                <ListGroup.Item
                  key={ i }
                  className="d-flex justify-content-between"
                >
                  <strong>
                    { p.name }
                  </strong>
                  <span
                    style={ { marginRight: "0px" } }
                  >
                    <Link to={ `/admin/product/update/${p._id}` }>
                      <button className='btn btn-secondary btn-sm me-3'>Update</button>
                    </Link>
                    <button
                      onClick={ () => handleDelete(p._id) }
                      className='btn btn-danger btn-sm'>Delete</button>
                  </span>
                </ListGroup.Item>) }


            </ListGroup>
          </Col>
        </Row>
      </Container>


    </React.Fragment >
  )
}

export default ManageProducts