export function getValueName(cardValue) {
  let valueName = "unknown";
  switch (cardValue) {
    case 7:
      valueName = "7";
      break;
    case 8:
      valueName = "8";
      break;
    case 9:
      valueName = "9";
      break;
    case 10:
      valueName = "10";
      break;
    case 11:
      valueName = "J";
      break;
    case 12:
      valueName = "Q";
      break;
    case 13:
      valueName = "K";
      break;
    case 14:
      valueName = "A";
      break;
    default:
      valueName = "Unknown";
      break;
  }
  return valueName;
}

export function getSuitName(suitNum) {
  let suitName = "unknown";
  switch (suitNum) {
    case 1:
      suitName = "Spade ♠";
      break;
    case 2:
      suitName = "Club ♣";
      break;
    case 3:
      suitName = "Diamond ♦";
      break;
    case 4:
      suitName = "Heart ♥";
      break;
    default:
      suitName = "Unknown";
      break;
  }
  return suitName;
}
export function getSuitSymbol(suitNum) {
  let suitName = "unknown";
  switch (suitNum) {
    case 1:
      suitName = "♠";
      break;
    case 2:
      suitName = "♣";
      break;
    case 3:
      suitName = "♦";
      break;
    case 4:
      suitName = "♥";
      break;
    default:
      suitName = "Unknown";
      break;
  }
  return suitName;
}

export function getSuitColor(suitNum) {
  let suitName = "green";
  switch (suitNum) {
    case 1:
    case 2:
      suitName = "black";
      break;
    case 3:
    case 4:
      suitName = "red";
      break;
    default:
      suitName = "green";
      break;
  }
  return suitName;
}

export function getCardRepresentation(card) {
  if (card.value === undefined) {
    console.log(card.value.not);
  } else {
    return `${this.getValueName(card.value)}${this.getSuitSymbol(card.suit)}`;
  }
}
