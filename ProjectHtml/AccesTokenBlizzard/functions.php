<?php
	include 'defines.php';

	function generateAccessToken() {
		$params = array(
			'grant_type' => 'client_credentials'
		);
		$tokenUri = 'https://eu.battle.net/oauth/token';

		$ch = curl_init();

		curl_setopt( $ch, CURLOPT_USERPWD, CLIENT_ID . ":" . CLIENT_SECRET );
		curl_setopt( $ch, CURLOPT_URL, $tokenUri );
		curl_setopt( $ch, CURLOPT_POSTFIELDS, http_build_query( $params ) );
		curl_setopt( $ch, CURLOPT_POST, 1 );
		curl_setopt( $ch, CURLOPT_SSL_VERIFYHOST, false );
		curl_setopt( $ch, CURLOPT_SSL_VERIFYPEER, false );
		curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );

		$response = curl_exec( $ch );
		curl_close( $ch );

		$accessTokenResponse = json_decode( $response, true );

		if ( isset( $accessTokenResponse['access_token'] ) ) { // we have access token
			$status = 'ok';
			$message = 'New access token save and ready for use.';
			echo($accessToken);
		} else { // no access token
			$status = 'fail';
			$message = 'Something went wrong trying to get an access token.';
		}

		return array(
			'status' => $status,
			'message' => $message,
			'raw_response' => $accessTokenResponse
		);
	}
?>