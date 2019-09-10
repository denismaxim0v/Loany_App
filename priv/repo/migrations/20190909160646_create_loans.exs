defmodule LoanyApp.Repo.Migrations.CreateLoans do
  use Ecto.Migration

  def change do
    create table(:loans) do
      add :amount, :integer
      add :name, :string
      add :phone_number, :string
      add :email, :string
      add :status, :boolean, default: false, null: false
      add :interest_rate, :float

      timestamps()
    end

  end
end
