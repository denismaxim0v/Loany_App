defmodule LoanyApp.Scoring do

  def set_interest_rate(amount) do
    #amount = String.to_integer(amount)
    if is_prime(amount) do
      {:ok, 9.99}
    else
      {:ok, Enum.random(4..12)}
    end
  end

  defp is_prime(number) when number <= 0, do: false
  defp is_prime(number) when number == 1, do: true
  defp is_prime(number) when number == 2, do: true
  defp is_prime(number) do
    2..number-1
      |> Enum.all?(&(rem(number, &1) > 0))
  end

end