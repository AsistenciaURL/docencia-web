import { useState } from 'react'
import { fetchPostAPI, fetchSingleAPI } from 'services/Connection'
import Professor from './types/Professor'

const useProfessors = () => {
  const [loading, setLoading] = useState(false)
  const [professor, setProfessor] = useState<Professor>({} as Professor)
  const [professors, setProfessors] = useState<Professor[]>([])

  const getProfessor = async (id: string) => {
    setLoading(true)
    const response = await fetchSingleAPI<Professor>('professors', id)
    setProfessor(response.data!)
    setLoading(false)
  }

  const createProfessor = async (professor: Professor) => {
    setLoading(true)
    const response = await fetchPostAPI<Professor>(
      'professors',
      professor,
      'Perfil del catedrático guardado correctamente'
    )
    setLoading(false)
    return response
  }

  return {
    loading,
    getProfessor,
    professor,
    professors,
    createProfessor
  }
}

export default useProfessors
