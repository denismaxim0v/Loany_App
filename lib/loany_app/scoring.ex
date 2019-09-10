defmodule LoanyApp.Scoring do

  alias LoanyApp.Cache

  # evaluating the application
  def evaluate_application(amount) do
    with {:ok} <- is_lowest(amount),
         {:ok, rate} <- set_interest_rate(amount) do
      {:ok, rate}
    else
      {:error, reason} -> {:error, reason}
    end
  end

  # check if the application amount is larger than the smallest prev application
  def is_lowest(amount) do
    IO.inspect Cache.get_minimum()
    lowest_value_in_cache = Cache.get_minimum()

    case lowest_value_in_cache > amount do
      false -> Cache.add(:apps, amount)
              {:ok}
      true -> {:error, :low}
    end
  end

  # set the interest rate
  def set_interest_rate(amount) do
    if is_prime(amount) do
      {:ok, 9.99}
    else
      {:ok, Enum.random(4..12)}
    end
  end

  # checking if the amount entered is a prime number
  defp is_prime(n) when n <= 0, do: false
  defp is_prime(n) when n == 1, do: true
  defp is_prime(n) when n == 2, do: true
  defp is_prime(n) do
    2..n-1
      |> Enum.all?(&(rem(n, &1) > 0))
  end
end