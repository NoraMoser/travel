import { useState } from "react";

export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
    </div>
  )
}

function Logo() {
  return <h1>Far Away 🌴🎒</h1>
}

function Form() {
const [description, setDescription] = useState("")
const [amount, setAmount] = useState(1)
const [packingItems, setPackingItems] = useState([])

    function handleSubmit(e) {
      e.preventDefault()

      const newItem = { description, quantity: amount, packed: false, id:Date.now()}

      setPackingItems((currItems => {
        return [...currItems, newItem]
      }))


      setDescription("")
      setAmount(1)
    }

    function handleDeleteItem(id) {
      setPackingItems(items=>items.filter(item=>item.id !== id))
    }

    function handleToggleItem(id) {
      setPackingItems(items => items.map(item=> item.id === id ? 
        {...item, packed: !item.packed} : item
      ))
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
        <PackingList packingItems={packingItems} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem} />
        <Stats items={packingItems}/>
    </>
  )
}

function PackingList({packingItems, onDeleteItem, onToggleItem}) {
  console.log(packingItems)
  return (
    <div className="list">
      <ul>
        {packingItems.map(item => {
          return <Item item={item} key={item.id} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem}/>
        })}
      </ul>
    </div>
  ) 
}

function Item({item, onDeleteItem, onToggleItem}) {
  return (
  <li>
    <input type="checkbox" value={item.packed} onChange={() => onToggleItem(item.id)}></input>
    <span style={item.packed ? {textDecoration: "line-through"} : {}}>{item.quantity} {item.description}</span>
    <button onClick={() => onDeleteItem(item.id)}>❌</button>
  </li>
  )
  
}

function Stats({items}) {
  const numItems = items.length
  const numPacked = items.filter(item => item.packed).length
  const percentage = Math.round((numPacked / numItems) * 100)

  return <footer className="stats">
    <em>
      {percentage === 100 ? 'You got everything. Ready to go!' :
      `You have ${numItems} items on your list, and you have already packed ${numPacked} (${percentage}%).`}
      Y
    </em>
  </footer>
}