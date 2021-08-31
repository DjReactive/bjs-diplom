const logOut = new LogoutButton();
const ratesBoard = new RatesBoard();
const moneyManager = new MoneyManager();
const favoritesWidget = new FavoritesWidget();

logOut.action = data => {
  ApiConnector.logout(response => {
    console.log(response);
    location.reload();
  });
}

ApiConnector.current(response => {
  if (response.success) ProfileWidget.showProfile(response.data);
});

// Вызов таймера с функцией обновления курсов валют
getStocks ();
setInterval(() => getStocks, 60000);

function getStocks () {
  ApiConnector.getStocks(response => {
    if (response.success) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(response.data);
    }
  })
}
function updateTable(obj, data) {
  obj.clearTable();
  obj.fillTable(data);
  moneyManager.updateUsersList(data);
}

/* ===== Money Manager ====== */
moneyManager.addMoneyCallback = data => {
  ApiConnector.addMoney(data, response => {
    if (response.success) {
      response.error = `Пополнеие прошло успешно!`
      ProfileWidget.showProfile(response.data);
    }
    moneyManager.setMessage(response.success, response.error);
  })
}
moneyManager.conversionMoneyCallback = data => {
  ApiConnector.convertMoney(data, response => {
    if (response.success) {
      response.error = `Конвертация прошла успешно!`
      ProfileWidget.showProfile(response.data);
    }
    moneyManager.setMessage(response.success, response.error);
  })
}
moneyManager.sendMoneyCallback = data => {
  ApiConnector.transferMoney(data, response => {
    if (response.success) {
      response.error = `Передача средства прошла успешно!`
      ProfileWidget.showProfile(response.data);
    }
    moneyManager.setMessage(response.success, response.error);
  })
}

/* ===== Favorites widget ====== */
ApiConnector.getFavorites(response => {
  if (response.success) updateTable(favoritesWidget, response.data);
})
favoritesWidget.addUserCallback = data => {
  ApiConnector.addUserToFavorites(data, response => {
    if (response.success) {
      updateTable(favoritesWidget, response.data);
      response.error = `Пользователь ${response.data.user} успешно добавлен!`
    }
    favoritesWidget.setMessage(response.success, response.error);
  })
}
favoritesWidget.removeUserCallback = data => {
  ApiConnector.removeUserFromFavorites(data, response => {
    if (response.success) {
      updateTable(favoritesWidget, response.data);
      response.error = `Пользователь ${response.data.user} успешно удален!`
    }
    favoritesWidget.setMessage(response.success, response.error);
  })
}
