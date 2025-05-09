import { useState } from "react"
import PackingList from "./PackingList"
import Stats from "./Stats"

export default function Form() {
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

    function handleClearList() {
      const confirmed = window.confirm("Are you sure?")

      if(confirmed) setPackingItems([])
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
        <PackingList packingItems={packingItems} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem} onClearList={handleClearList}/>
        <Stats items={packingItems}/>
    </>
  )
}