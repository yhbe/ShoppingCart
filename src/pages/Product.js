import React from "react"
import Header from "../components/Header"

export default function ProductPage(props){
  const [apiData,setApiData] = React.useState([])
  const [loaded, setLoaded] = React.useState(false)

  React.useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        let arr = []
        json.map(a => {
          a.quantity = 1
          if (a.category === "women's clothing" || a.category === "men's clothing"){
            arr.push(a)
          }
        })
        setApiData(arr)
      })
      .then(() => setLoaded(true));
  }, [])

  let clothingData

  if (loaded) {
   clothingData = apiData.map((item) => setClothingData(item))
  }

  function setClothingData(data){
    return (
      <div key={data.id} className={"product--items"}>
      <img className="product--items-image" src={data.image} alt={data.title}></img>
      <hr></hr>
      <div className="product--text">
      <p>{data.title}</p>
      <p>${data.price}</p>
      </div>
      <button onClick={() => props.setItemsInCart(prevState => {
        let newArr = []
        newArr.push(...prevState)
        if (newArr.every(item => item.id !== data.id)) {
          newArr.push(data)
        } else {
          newArr = newArr.map(item => {
            if (item.id === data.id){
              return {
                ...item,
                price:
                  Math.round(
                    (item.price + item.price / item.quantity) * 100
                  ) / 100,
                quantity: item.quantity + 1,
              };
            } else return item
          })
        }
        return newArr
      })} className="product--items-button">Add to cart</button>
      </div>
    )
  }


  return (
    <>
      <Header setItemsInCart={props.setItemsInCart} itemsInCart={props.itemsInCart} />
      <div className="product--container">
        <>{loaded && clothingData}</>
      </div>
    </>
  );
}