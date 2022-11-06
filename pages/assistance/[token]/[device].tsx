import { ReactNode, useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Fade from '@mui/material/Fade'
import Typography from '@mui/material/Typography'

import AssistanceForm from 'components/assistance/AssitanceForm'
import Empty from 'layouts/Empty'
import PrimaryButton from 'components/core/PrimaryButton'
import SecondaryButton from 'components/core/SecondaryButton'
import StudentListItem from 'components/core/StudentListItem'
import useDevices from 'hooks/useDevices'

export async function getServerSideProps({
  query
}: {
  query: { token: string; device: string }
}) {
  const { token, device } = query
  return {
    props: { token, deviceId: device }
  }
}

const AssistenceSession = ({
  deviceId,
  token
}: {
  token: string
  deviceId: string
}) => {
  const [permission, setPermission] = useState(false)
  const router = useRouter()
  // const { getDevice, device } = useDevices()
  const device = {
    student: true
  }

  useEffect(() => {
    getPermission()
  }, [])

  const getPermission = async () => {
    // const response = await fetch(
    //   `${process.env.NEXT_PUBLIC_API_URL}/token/${token}`
    // )
    // const data = await response.json()

    // if (data.status === 'success') {
    //   setPermission(true)
    //   getDevice(deviceId)
    // }
    // if (data.status === 'error') {
    //   router.push('/assistance/error')
    // }
    setPermission(true)
  }

  const refetch = () => {
    getDevice(deviceId)
  }

  const confirmAssistance = () => {}

  return (
    <div className="bg-gradient-to-r from-[#2c79ff] via-[#0e46a7] to-[#082E71] w-screen h-screen flex justify-center items-center">
      <div className="md:w-1/3 ">
        <Card>
          <Fade in={true}>
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {device && device.student
                  ? 'Confirmar asistencia'
                  : 'Ingrese el carnet para tomar asistencia'}
              </Typography>
              {device && device.student && (
                <div>
                  <Divider />
                  <StudentListItem
                    email="tatobig@gmail.com"
                    id="1551619"
                    name="Santiago Navas"
                  />
                </div>
              )}

              {permission ? (
                <div>
                  {device && device.student ? (
                    <div>
                      <PrimaryButton
                        label="Confirmar asistencia"
                        onClick={confirmAssistance}
                      />
                      <SecondaryButton
                        margin={false}
                        label="Modificar carnet"
                        onClick={confirmAssistance}
                      />
                    </div>
                  ) : (
                    <AssistanceForm id={deviceId} refetch={refetch} />
                  )}
                </div>
              ) : (
                <div></div>
              )}
            </CardContent>
          </Fade>
        </Card>
      </div>
    </div>
  )
}

AssistenceSession.layout = function layout(page: ReactNode) {
  return <Empty>{page}</Empty>
}

export default AssistenceSession
