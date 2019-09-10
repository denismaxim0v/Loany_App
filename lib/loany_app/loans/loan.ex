defmodule LoanyApp.Loans.Loan do
  use Ecto.Schema
  import Ecto.Changeset
  alias LoanyApp.Scoring
  alias LoanyApp.Cache

  schema "loans" do
    field :amount, :integer
    field :email, :string
    field :interest_rate, :float
    field :name, :string
    field :phone_number, :string
    field :status, :boolean

    timestamps()
  end

  @doc false
  def changeset(%LoanyApp.Loans.Loan{}, attrs) do
    %LoanyApp.Loans.Loan{}
    |> cast(attrs, [:amount, :name, :phone_number, :email, :status, :interest_rate])
    |> validate_required([:amount, :name, :phone_number, :email])
    |> validate_number(:amount, greater_than: 0)
    |> validate_format(:email, ~r/@/)
  end

  def scoring(changeset, attrs) do
    changeset
    |> cast(attrs, [:status, :interest_rate])
  end

  def generate_changeset(params) do
    changeset = changeset(%LoanyApp.Loans.Loan{}, params)

    update_changeset(changeset)
  end

  def update_changeset(changeset) do
    {:ok, amount} = fetch_change(changeset, :amount)

    Cache.add(:apps, amount)

    {_, interest} = Scoring.set_interest_rate(amount)

    scoring(changeset, %{status: true, interest_rate: interest})
  end
end
