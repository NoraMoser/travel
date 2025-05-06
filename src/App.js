import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
];

export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <Stats />
    </div>
  )
}

function Logo() {
  return <h1>Far Away 🌴🎒</h1>
}

function Form() {
const [description, setDescription] = useState("")
const [amount, setAmount] = useState(1)
const [packingItems, setPackingItems] = useState(initialItems)

    function handleSubmit(e) {
      e.preventDefault()

      const newItem = { description, quantity: amount, packed: false, id:Date.now()}

      setPackingItems((currItems => {
        return [...currItems, newItem]
      }))


      setDescription("")
      setAmount(1)
    }

  return (
    <>
      <form className="add-form" onSubmit={handleSubmit}>
        <h3>What do you need for your trip?</h3>
        <select value={amount} onChange={(e) => setAmount(Number(e.target.value))}>
          {Array.from({ length:20}, (__, index) => index + 1).map(num=> <option value={num} key={num}>{num}</option>)}
        </select>
        <input type="text" placeholder="Item..." value={description} onChange={(e) => setDescription(e.target.value)}></input>
        <button>Add</button>
      </form>
        <PackingList packingItems={packingItems} />
    </>
  )
}

function PackingList({packingItems}) {
  return (
    <div className="list">
      <ul>
        {packingItems.map(item => {
          return <Item item={item} key={item.id} />
        })}
      </ul>
    </div>
  ) 
}

function Item({item}) {
  return <li>
    <span style={item.packed ? {textDecoration: "line-through"} : {}}>{item.quantity} {item.description}</span>
    <button>x</button>
  </li>
}

function Stats() {
  return <footer className="stats">
    You have x items on your list, and you have already packekd x.
  </footer>
}