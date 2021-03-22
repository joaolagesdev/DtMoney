import { useContext } from 'react'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import totalImg from '../../assets/total.svg'
import { TransactionsContext } from '../../TransactionsContext'

import { Container } from "./styles"

export function Summary() {
	const { transactions } = useContext(TransactionsContext)

	// const totalDeposits = transactions.reduce((acc, transaction) => {
	// 	if (transaction.type === 'deposit') {
	// 		return acc+ transaction.amount
	// 	}
	// 	return acc
	// }, 0)

	const summary = transactions.reduce((acc, transaction) => {
		if (transaction.type === 'deposit') {
			acc.deposits += transaction.amount
			acc.total += transaction.amount
		} else {
			acc.withdrawns += transaction.amount
			acc.total -= transaction.amount
		}
		return acc
	}, {
		deposits: 0,
		withdrawns: 0,
		total: 0
	})

	return (
		<Container>
			<div>
				<header>
					<p>Entradas </p>
					<img src={incomeImg} alt="Entradas" />
				</header>
				<strong>{new Intl.NumberFormat('PT-br', {
					style: 'currency',
					currency: 'BRL'
				}).format(summary.deposits)}</strong>
			</div>
			<div>
				<header>
					<p>Saídas </p>
					<img src={outcomeImg} alt="Saídas" />
				</header>
				<strong>- {new Intl.NumberFormat('PT-br', {
					style: 'currency',
					currency: 'BRL'
				}).format(summary.withdrawns)}</strong>
			</div>
			<div className="highlight-background">
				<header>
					<p>Total </p>
					<img src={totalImg} alt="Total" />
				</header>
				<strong>{new Intl.NumberFormat('PT-br', {
					style: 'currency',
					currency: 'BRL'
				}).format(summary.total)}</strong>
			</div>
		</Container>
	)
}
