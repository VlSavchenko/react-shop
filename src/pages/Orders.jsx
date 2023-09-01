import React from 'react';
import axios from 'axios';
import Card from '../components/Card';

function Orders() {
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {

    (async () => {
      try {
        const { data } = await axios.get('http://localhost:3001/orders');
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setIsLoading(false);
      } catch (error) {
        alert('Fetch orders Error');
      }
    })();

  }, []);

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои заказы</h1>
      </div>

      <div className="d-flex flex-wrap">
        {
          (isLoading ? [...Array(8)] : orders).map((item, index) => (
            <Card
              key={item === undefined ? index : item.id}
              loading={isLoading}
              {...item}
            />
          ))
        }
      </div>
    </div>
  )

}

export default Orders;