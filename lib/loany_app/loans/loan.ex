defmodule LoanyApp.Loans.Loan do
  use Ecto.Schema
  import Ecto.Changeset
  alias LoanyApp.Scoring
  @derive {Jason.Encoder, only: [:amount, :id, :email, :interest_rate, :name, :phone_number, :status]}

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
  def changeset(loan, attrs) do
    loan
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
    case changeset.valid? do
      true -> update_changeset(changeset)
      false -> changeset
    end
    
  end

  def update_changeset(changeset) do
    {:ok, amount} = fetch_change(changeset, :amount)

    query =
      case Scoring.evaluate_application(amount) do
        {:ok, interest} -> %{status: true, interest_rate: interest}
        {:error, _} -> %{status: false}
      end

    scoring(changeset, query)
  end
end
