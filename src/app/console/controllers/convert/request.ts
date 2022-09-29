type AcceptedCurrencies = "BTC" | "ETH" | "GBP" | "USD" | "EUR";

type ConvertConsoleRequest = {
  from: AcceptedCurrencies;
  to: AcceptedCurrencies;
  amount: number;
  digits?: number;
};

export default ConvertConsoleRequest;
