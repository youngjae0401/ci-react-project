<?php
namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\BoardModel;

class Board extends ResourceController
{
    private $board;

    public function __construct()
    {
        $this->board = new BoardModel();
    }

    use ResponseTrait;
    public function index()
    {
        $data = $this->board->findAll();
        return $this->respond($data);
    }

    public function show($id = null)
    {
        //
    }

    public function new()
    {
        //
    }

    public function create()
    {
        helper(['form']);

        $rules = [
            'title' => 'required',
            'content' => 'required'
        ];

        if(!$this->validate($rules)) {
            return $this->failValidationErrors("값을 입력해주세요.");
        }

        $data = [
            'title' => $this->request->getVar('title'),
            'content' => $this->request->getVar('content')
        ];

        $this->board->insert($data);

        $response = [
            'status' => 201,
            'error' => false,
            'messages' => '저장되었습니다'
        ];

        return $this->respondCreated($response);
    }

    public function edit($id = null)
    {
        //
    }

    public function update($id = null)
    {

        helper(['form']);

        $rules = [
            'title' => 'required',
            'content' => 'required'
        ];

        if(!$this->validate($rules)) {
            return $this->failValidationErrors("값을 입력해주세요.");
        }

        $data = [
            'title' => $this->request->getVar('title'),
            'content' => $this->request->getVar('content')
        ];

        $findId = $this->board->find(['id' => $id]);
        
        if(!$findId) {
            return $this->fail("데이터 오류입니다.");
        }

        $this->board->update($id, $data);

        $response = [
            'status' => 200,
            'error' => false,
            'messages' => '수정되었습니다.'
        ];

        return $this->respond($response);
    }

    public function delete($id = null)
    {
        $findId = $this->board->find(['id' => $id]);

        if(!$findId) {
            return $this->fail("데이터 오류입니다.");
        }

        $this->board->delete($id);

        $response = [
            'status' => 200,
            'error' => false,
            'messages' => '삭제되었습니다.'
        ];

        return $this->respond($response);
    }
}
