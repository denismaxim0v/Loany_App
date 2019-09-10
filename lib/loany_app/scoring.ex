defmodule LoanyApp.Scoring do

  alias LoanyApp.Cache

  def set_interest_rate(amount) do
    IO.inspect Cache.find(:apps)
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