import axios from "axios";
const delToggle = document.querySelectorAll(".delToggle");
let price = document.querySelector(".finalPrice");
if (price) price = Number(price.innerHTML.replace("₹", ""));
const placeOrderBtn = document.querySelector(".plOrder");
const priceTxt = document.querySelector(".finalPrice");
const products = document.querySelectorAll(".prodName");

let finalPrice = price;
let prodId = [],
  prodQty = [],
  buyer;
if (products.length != 0) {
  products.forEach((e) => prodId.push(e.dataset.id));
  products.forEach((e) => prodQty.push(e.dataset.qty));
  buyer = products[0].dataset.buyer;
}
export const addListener = () => {
  if (delToggle) {
    delToggle.forEach((e) => {
      e.addEventListener("click", () => {
        if (e.dataset.id == 1) priceTxt.innerHTML = `₹ ${price}`;
        else if (e.dataset.id == 2) priceTxt.innerHTML = `₹ ${price + 50}`;
        else if (e.dataset.id == 3) priceTxt.innerHTML = `₹ ${price + 100}`;

        finalPrice = Number(
          document.querySelector(".finalPrice").innerHTML.replace("₹", "")
        );
      });
    });
  }
  if (placeOrderBtn) {
    placeOrderBtn.addEventListener("click", () => {
      placeOrder();
    });
  }
};
const placeOrder = async () => {
  try {
    const res = await axios({
      method: "POST",
      url: `/api/v1/order/newOrder`,
      data: {
        products: prodId,
        buyer,
        totalPrice: finalPrice,
        productsQty: prodQty,
      },
    });
    if (res.data.status === "success") {
      //   addCartBtn.parentElement.innerHTML = "ADDED";
      window.location.href = "/";
      // location.reload();
    }
  } catch (err) {
    console.log("ERRRRORR", err);
    // showAlert("error", err.response.data.message);
  }
  return true;
};
