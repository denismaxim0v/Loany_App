defmodule LoanyApp.Cache do
  use GenServer

  def start_link(_) do
    GenServer.start_link(__MODULE__, :ok, name: __MODULE__)
  end

  def init(:ok) do
    table = :ets.new(:apps_cache, [:named_table, :public])
    :ets.insert(:apps_cache, {:apps, []})
    {:ok, table}
  end

  def find(name) do
    case :ets.lookup(:apps_cache, name) do
      [{^name, items}] -> {:ok, items}
      [] -> :error
    end
  end

  def new(name) do
    GenServer.call(__MODULE__, {:new, name})
  end

  def add(name, item) do
    GenServer.call(__MODULE__, {:add, name, item})
  end

  def get_minimum() do
      {_, list} = find(:apps)
      list = if length(list) < 1, do: [0], else: list
      list
      |> Enum.min()
  end

  def handle_call({:new, name}, _from, table) do
    case find(name) do
      {:ok, name} ->
        {:reply, name, table}

      :error ->
        :ets.insert(table, {name, []})
        {:reply, [], table}
    end
  end

  def handle_call({:add, name, item}, _from, table) do
    case find(name) do
      {:ok, items} ->
        items = [item | items]
        :ets.insert(table, {name, items})
        {:reply, items, table}

      :error ->
        {:reply, {:error, :list_not_found}, table}
    end
  end
end
