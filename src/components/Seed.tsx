import cardanoPriceJSON from "../../cardanoprices.json";
import axios from "axios";

const Seed = () => {
  const create = async () => {
    for (let i = 0; i < cardanoPriceJSON.length; i++) {
      try {
        const url =
          "http://127.0.0.1:8090/api/collections/cardanoPrice/records";
        const respose = await axios({
          method: "post",
          url: url,
          data: {
            time_period_start: cardanoPriceJSON[i].time_period_start,
            time_period_end: cardanoPriceJSON[i].time_period_end,
            time_open: cardanoPriceJSON[i].time_open,
            time_close: cardanoPriceJSON[i].time_close,
            price_open: cardanoPriceJSON[i].price_open,
            price_high: cardanoPriceJSON[i].price_high,
            price_low: cardanoPriceJSON[i].price_open,
            price_close: cardanoPriceJSON[i].price_close,
            volume_traded: cardanoPriceJSON[i].volume_traded,
            trades_count: cardanoPriceJSON[i].trades_count,
          },
        });
      } catch (error) {
        console.error(error.message);
      }
    }
  };
  return (
    <div>
      <button onClick={create}>Seed</button>
    </div>
  );
};

export default Seed;
